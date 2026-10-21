# 🚀 Deploy na Vercel

Seu projeto está pronto para fazer deploy na Vercel! Siga estes passos:

## Opção 1: Deploy Automático (Mais Fácil)

### 1. Clique aqui para fazer deploy:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/thiagoziko771-boop/FUNCIONABLACKK)

### 2. Autorize com GitHub

Quando pedido, autorize o Vercel a acessar seu GitHub.

### 3. Configure Variáveis de Ambiente

Na tela de configuração, antes de fazer deploy, adicione:

```
BLACKCAT_API_KEY = sk_live_...
BLACKCAT_PUBLIC_KEY = pk_live_...
```

### 4. Clique em "Deploy"

Aguarde o deploy ser concluído (leva ~2 minutos).

---

## Opção 2: Deploy Manual com CLI

### 1. Instale Vercel CLI
```bash
npm i -g vercel
```

### 2. Clone o Repositório
```bash
git clone https://github.com/thiagoziko771-boop/FUNCIONABLACKK.git
cd FUNCIONABLACKK
```

### 3. Faça Deploy
```bash
vercel
```

### 4. Preencha as Informações
- **Project name**: FUNCIONABLACKK
- **Directory**: . (atual)
- **Build command**: npm run build (ou deixe vazio)
- **Output directory**: public (ou deixe vazio)

### 5. Configure Variáveis de Ambiente
```bash
vercel env add BLACKCAT_API_KEY
# Cole sua chave aqui

vercel env add BLACKCAT_PUBLIC_KEY
# Cole sua chave pública aqui
```

### 6. Faça Deploy de Produção
```bash
vercel --prod
```

---

## 📝 Variáveis Necessárias

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `BLACKCAT_API_KEY` | API Key da Blackcat | sk_live_... |
| `BLACKCAT_PUBLIC_KEY` | Chave Pública Blackcat | pk_live_... |
| `NEXT_PUBLIC_SUPABASE_URL` | URL Supabase (opcional) | https://... |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave Supabase (opcional) | ... |
| `UTMIFY_TOKEN` | Token UTMify (opcional) | ... |

---

## 🧪 Testando Após Deploy

Quando o deploy ficar pronto, teste a função:

```bash
curl -X POST https://seu-projeto.vercel.app/api/pix-blackcat \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste",
    "email": "teste@example.com",
    "phone": "11999999999",
    "cpf": "12345678901",
    "amount": 67.20
  }'
```

Resposta esperada:
```json
{
  "success": true,
  "transaction_id": "TXN-...",
  "pixCode": "00020126580...",
  "amount": 67.20
}
```

---

## 📊 Endpoints Disponíveis

### Gerar PIX
```
POST /api/pix-blackcat
```

### Verificar Pagamento
```
GET /api/check-payment-blackcat?id=TRANSACTION_ID
```

### Webhook
```
POST /api/webhook-blackcat
```

---

## 🔗 Links Úteis

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repositório**: https://github.com/thiagoziko771-boop/FUNCIONABLACKK
- **Documentação Blackcat**: https://api.blackcatoficial.com

---

## ⚠️ Dicas de Segurança

- ✅ Variáveis de ambiente são seguras no Vercel
- ✅ Nunca coloque .env no Git (já está no .gitignore)
- ✅ Use credenciais de produção apenas em produção
- ✅ Tokens são criptografados no Vercel

---

**Pronto!** Seu projeto está 100% pronto para Vercel. 🎉
