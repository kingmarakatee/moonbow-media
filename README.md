# 🌙 Moonbow Media - Website Profissional

> **Where moonlight paints in colors** - Capturamos a beleza rara dos seus momentos com a mesma magia com que a lua pinta o céu noturno.

## 📁 Estrutura de Ficheiros

```
moonbow_site/
├── index (1).html          # Arquivo principal do site
├── README.md               # Este ficheiro
├── MELHORIAS.md            # Detalhes das melhorias implementadas
└── logoAsset2.png          # Logo do Moonbow (referenciado no HTML)
```

## 🚀 Como Usar

### Opção 1: Abrir Diretamente
Simplesmente abra o ficheiro `index (1).html` no seu navegador:
- Clique duas vezes no ficheiro
- Ou arrastar e largar num browser
- Ou clicar com botão direito → Abrir com...

### Opção 2: Servidor Local (Recomendado)
Para testar com melhor performance e evitar problemas de CORS:

**Com Python 3:**
```bash
cd c:\moonbow_site
python -m http.server 8000
```
Depois acesse: `http://localhost:8000`

**Com Node.js (http-server):**
```bash
npx http-server c:\moonbow_site
```

**Com PHP:**
```bash
cd c:\moonbow_site
php -S localhost:8000
```

## 🎨 Características Principais

### ✨ Seções

1. **Hero Section** - Apresentação vibrante com CTA
2. **Serviços** - 3 categorias principais com features
3. **Portfólio** - Galeria interativa com filtros
4. **Processo** - 6 etapas do workflow
5. **Clientes** - Casos de sucesso com depoimentos
6. **Testemunhos** - Slider automático
7. **Sobre** - Missão e estatísticas
8. **Contato** - Formulário + informações

### 🎯 Funcionalidades Interativas

- ✅ Menu responsivo (mobile)
- ✅ Header dinâmico ao scroll
- ✅ Filtros de portfólio com animação
- ✅ Slider de testemunhos automático
- ✅ Formulário de contato com validação
- ✅ Animações suaves (CSS + JavaScript)
- ✅ Hover effects avançados
- ✅ Smooth scrolling

### 🎨 Design

- **Cores**: Laranja (#FA4144), Vermelho (#F2712D), Dourado (#F8951F)
- **Tipografia**: Inter (corpo) + Syne (títulos)
- **Layout**: Grid + Flexbox responsivo
- **Efeitos**: Gradientes, blur, glows, animações
- **Breakpoints**: 1024px, 768px, 576px

## 📱 Responsividade

✓ **Desktop** (1200px+) - Layout completo
✓ **Tablet** (768px - 1024px) - Layout adaptado
✓ **Mobile** (até 576px) - Layout otimizado

## 🔧 Customização

### Mudar Cores
No `<style>`, altere as variáveis CSS no `:root`:
```css
:root {
    --primary-dark: #0a0e27;
    --accent-gold: #F8951F;
    --accent-purple: #FA4144;
    /* ... */
}
```

### Adicionar Novo Portfólio
```html
<div class="portfolio-item" data-filter="video">
    <div class="portfolio-content">
        <span class="portfolio-category">Categoria</span>
        <h3 class="portfolio-title">Título</h3>
        <p class="portfolio-description">Descrição</p>
    </div>
</div>
```

### Modificar Serviços
Altere os 3 cards `.service-card` na seção de serviços.

### Customizar Cliente/Testimonial
Procure por `.client-card` ou `.testimonial-slide` para editar.

## 📧 Formulário de Contato

Atualmente o formulário mostra um alerta básico. Para funcionalidade real, integre:

- **EmailJS** (cliente-side, sem backend)
- **Formspree** (formulário SaaS)
- **Supabase Forms** (com database)
- **Seu próprio backend** (PHP, Node.js, etc)

## 🌐 Deployment

### Sugestões de Hosting Gratuito:

1. **Vercel** (recomendado para sites estáticos)
   ```bash
   vercel
   ```

2. **GitHub Pages**
   - Upload para repositório GitHub
   - Ativar Pages nas settings

3. **Netlify**
   - Drag & drop da pasta
   - Deploy automático

4. **Surge.sh**
   ```bash
   npm install -g surge
   surge c:\moonbow_site
   ```

## 📊 SEO & Meta Tags

Para melhorar SEO, customize no `<head>`:
```html
<title>Moonbow Media | Seu Tagline</title>
<meta name="description" content="Descrição do site">
<meta name="keywords" content="vídeo, broadcast, design">
<meta property="og:image" content="sua-imagem.jpg">
```

## 🎬 Próximos Passos Recomendados

1. **Adicionar Logo Real**
   - Substitua `logoAsset2.png` pela sua logo
   - Atualize o `<img src>` no header

2. **Integrar Google Analytics**
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
   ```

3. **Implementar Formulário Real**
   - Use EmailJS, Formspree ou similar
   - Adicione validação avançada

4. **Adicionar Imagens do Portfólio**
   - Substitua os gradientes por imagens reais
   - Use thumbnails de boa qualidade

5. **Otimizar Performance**
   - Minify CSS/JavaScript
   - Otimizar imagens
   - Lazy loading

6. **Adicionar Mais Seções**
   - Blog/Artigos
   - FAQ
   - Pricing/Planos
   - Parceiros

## 🐛 Troubleshooting

**"Formulário não envia email"**
- É normal - está configurado apenas para validação local
- Integre EmailJS ou similar

**"Menu mobile não funciona"**
- Verifique se JavaScript está ativado
- Abra console (F12) para ver erros

**"Imagens não carregam"**
- Coloque as imagens na mesma pasta que o HTML
- Ou use URLs absolutas

**"Animações lentas"**
- Desative o hardware acceleration se necessário
- Ou reduza a quantidade de efeitos

## 📚 Recursos Úteis

- **Fontes**: [Google Fonts](https://fonts.google.com)
- **Ícones**: [Font Awesome](https://fontawesome.com)
- **Cores**: [Coolors.co](https://coolors.co)
- **Animações**: [Animate.style](https://animate.style)
- **Efeitos CSS**: [CSS Tricks](https://css-tricks.com)

## 📄 Licença

Este template foi criado para Moonbow Media. Uso livre para fins comerciais e pessoais.

---

**Versão**: 2.0 (Completamente Reformulado)
**Data**: Janeiro 2026
**Status**: ✅ Pronto para Produção

**Desenvolvido com ❤️ usando HTML5, CSS3 e JavaScript Vanilla**
