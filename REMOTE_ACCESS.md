# Acessar o site pelo celular (LAN ou link público)

Este documento explica duas formas de acessar o site da pasta deste repositório a partir do seu celular:

- Opção A — Rede local (LAN): acesso via IP do seu computador na mesma rede Wi‑Fi.
- Opção B — Link público (ngrok): cria um túnel público HTTPS que funciona mesmo fora da rede.

Passos rápidos

1) Abra um terminal na pasta do projeto (onde está `index.html`).
2) Inicie um servidor HTTP local (ex.: porta 8000).
3) Use a opção desejada abaixo para acessar pelo celular.

Opção A — Acesso pela mesma rede (LAN)

1. No terminal, rode:

```
python -m http.server 8000
```

2. No Windows, descubra o IP local do seu PC com `ipconfig` e procure a interface Wi‑Fi (IPv4).

3. No celular (conectado ao mesmo Wi‑Fi), abra o navegador e acesse:

```
http://SEU_IP_LOCAL:8000
```

Observações:
- Se o firewall do Windows perguntar, permita o Python (ou a porta 8000) na rede privada.
- Garanta que o celular esteja na mesma rede Wi‑Fi.

Opção B — Link público com ngrok (funciona fora da rede)

1. Baixe o ngrok em https://ngrok.com/ e crie uma conta (gratuita).
2. No Windows, instale seu `authtoken` conforme instruções do ngrok:

```
ngrok authtoken <SEU_AUTHTOKEN>
```

3. Inicie o servidor local (como em Opção A) e, em outro terminal, rode:

```
ngrok http 8000
```

4. O ngrok mostrará uma URL pública (algo como `https://xxxxxx.ngrok.io`). Cole essa URL no navegador do celular.

Scripts incluídos

- `start_server.bat`: inicia um servidor HTTP Python na porta 8000.
- `start_ngrok.bat`: abre uma janela separada para o servidor e inicia o `ngrok http 8000` (assume que `ngrok` está no `PATH`).

Usando os scripts (Windows)

1. Clique duas vezes em `start_server.bat` para iniciar o servidor local.
2. Em outra janela, clique em `start_ngrok.bat` para abrir o túnel público (se instalado).

Se quiser, posso ajudar a configurar o `ngrok` e testar o link público. Diga se prefere LAN ou link público.
