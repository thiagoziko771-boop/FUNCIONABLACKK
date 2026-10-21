# ⚠️ INSTRUÇÕES CRÍTICAS PARA VERCEL

## PASSO 1: Verificar Branch no Painel Vercel

1. Abra: https://vercel.com/dashboard
2. Clique no projeto `funcionablackk-3q73`
3. Vá em **Settings → Git**
4. Verifique qual **Production Branch** está configurada
5. **DEVE ESTAR EM `master`** (não `production`)
6. Se estiver diferente, altere para `master` e salve

## PASSO 2: Forçar Redeploy

1. No painel do projeto, clique em **Deployments**
2. Encontre o deployment mais recente com erro 404
3. Clique no menu (3 pontos) e escolha **Redeploy**
4. **OU** faça um commit vazio:
   ```
   git commit --allow-empty -m "Trigger redeploy"
   git push origin master
   ```

## PASSO 3: Configurar Variável de Ambiente

1. No painel do projeto, vá em **Settings → Environment Variables**
2. Clique em **Add New**
3. Preench com:
   - **Name:** `BLACKCAT_API_KEY`
   - **Value:** Copie a chave do arquivo `.env` local (pasta raiz do projeto)
   - **Environments:** Selecione **Production, Preview, Development**
4. Clique **Add**
5. **Aguarde o redeploy automático** (2-3 minutos)

## PASSO 4: Testar

1. Abra: https://funcionablackk-3q73.vercel.app
2. Verifique:
   - ✅ Página carrega corretamente
   - ✅ Console do navegador sem erros 404
   - ✅ Botão de gerar PIX funciona

## Se ainda não funcionar:

1. Abra **DevTools** (F12) → **Console**
2. Procure por erro vermelho
3. Se vir erro na API, verifique se a variável de ambiente foi realmente salva

---

**Status atual:** Código foi para GitHub em commit `3bba4b3`
**Próximo:** Aguarde redeploy na Vercel após adicionar a variável de ambiente
