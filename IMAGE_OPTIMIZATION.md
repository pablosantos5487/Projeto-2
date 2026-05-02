Instruções de otimização de imagens

Objetivo: reduzir tamanho e gerar WebP para melhor performance no site.

Recomendações gerais:
- Mantenha nomes sem espaços: ex: IMG_produto1.jpg
- Tamanhos sugeridos para web: 800px de largura para foto de produto padrão.
- Use `loading="lazy"` nas tags `<img>` (já presente no site).

Comandos (Windows / macOS / Linux):

1) Usando ImageMagick (magick / convert):

Redimensionar para 800px de largura e otimizar:

```
magick "IMG/IMG_produto1.jpg" -strip -resize 800x -quality 75 "IMG/IMG_produto1-800.jpg"
```

Converter para WebP (boa opção para navegadores modernos):

```
magick "IMG/IMG_produto1-800.jpg" -quality 80 "IMG/IMG_produto1-800.webp"
```

2) Usando cwebp (ferramenta do Google):

```
cwebp -q 80 IMG/IMG_produto1-800.jpg -o IMG/IMG_produto1-800.webp
```

3) Alternativa rápida com Sharp (Node.js):

```
npx sharp IMG/IMG_produto1.jpg --resize 800 --webp -q 80 -o IMG/IMG_produto1-800.webp
```

Sugestões de workflow:
- Gere uma versão JPG/PNG otimizada (`-resize 800 -quality 75`) e uma versão WebP.
- No HTML, use `<picture>` para oferecer WebP com fallback JPG:

```
<picture>
  <source srcset="IMG/IMG_produto1-800.webp" type="image/webp">
  <img src="IMG/IMG_produto1-800.jpg" alt="Descrição do produto" loading="lazy">
</picture>
```

Se quiser, eu posso:
- Gerar exemplos de `<picture>` no `index.html` para os primeiros produtos (você só precisa colocar os arquivos otimizados em `IMG/`).
- Sugerir qualidade/resolução para cada tipo de produto.

Fim.
