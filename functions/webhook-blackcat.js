const { getSupabase } = require("./lib/supabase");

// Configuração Blackcat
const WEBHOOK_SECRET = process.env.BLACKCAT_WEBHOOK_SECRET || "";

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  };
}

// Verificação de assinatura - se implementada pela Blackcat
function verifyWebhookSignature(payload, signature) {
  // Documentação da Blackcat especificará como validar
  console.warn("[WEBHOOK-BLACKCAT] Verificação de assinatura - implementar conforme docs");
  return true;
}

exports.handler = async (event) => {
  console.log("[WEBHOOK-BLACKCAT] ===== WEBHOOK RECEBIDO =====");
  console.log("[WEBHOOK-BLACKCAT] Headers:", event.headers);

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Método não permitido" });
  }

  let body = {};
  try {
    body = event.body ? JSON.parse(event.body) : {};
  } catch (err) {
    console.error("[WEBHOOK-BLACKCAT] Erro ao parsear JSON:", err.message);
    return jsonResponse(400, { error: "JSON inválido" });
  }

  console.log("[WEBHOOK-BLACKCAT] Payload:", JSON.stringify(body, null, 2));

  try {
    // Parse conforme padrão de webhook da Blackcat
    const transactionId = body.transactionId || body.transaction_id || body.id;
    const status = body.status ? body.status.toLowerCase() : null;
    const paidAt = body.createdAt || body.paid_at || new Date().toISOString();

    if (!transactionId) {
      console.error("[WEBHOOK-BLACKCAT] Transaction ID não encontrado no payload");
      return jsonResponse(400, { error: "Transaction ID not found" });
    }

    console.log("[WEBHOOK-BLACKCAT] Processando transação:", transactionId, "Status:", status);

    // Atualizar status no Supabase
    const supabase = getSupabase();
    
    const updateData = { status };
    if (status === "paid") {
      updateData.paid_at = paidAt;
    }

    const { error: updateError } = await supabase
      .from("transactions")
      .update(updateData)
      .eq("transaction_id", transactionId);

    if (updateError) {
      console.error("[WEBHOOK-BLACKCAT] Erro ao atualizar transação:", updateError.message);
      return jsonResponse(500, { error: "Database update failed" });
    }

    console.log("[WEBHOOK-BLACKCAT] ✓ Transação atualizada:", transactionId, "Status:", status);

    return jsonResponse(200, {
      success: true,
      message: "Webhook processado com sucesso",
      transaction_id: transactionId,
      status: status,
    });

  } catch (err) {
    console.error("[WEBHOOK-BLACKCAT] Erro ao processar webhook:", err.message);
    return jsonResponse(500, {
      success: false,
      error: "Erro ao processar webhook",
    });
  }
};
