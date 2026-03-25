const fs = require('fs');

function createEnglishPages() {
    const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('-en'));
    
    files.forEach(file => {
        let html = fs.readFileSync(file, 'utf8');
        
        const baseName = file.replace('.html', '');
        
        // Use a generic logic to replace the whole div to ensure clean sync across all versions
        const langDivPattern = /<div class="lang-switch">[\s\S]*?<\/div>/g;

        const ptLangReplacement = `<div class="lang-switch">
                          <a href="#" class="active">PT</a><span>|</span><a href="${baseName}-en.html">EN</a>
                      </div>`;
                      
        html = html.replace(langDivPattern, ptLangReplacement);
        fs.writeFileSync(file, html, 'utf8');
        
        let enHtml = fs.readFileSync(file, 'utf8');
        
        const enLangReplacement = `<div class="lang-switch">
                          <a href="${file}">PT</a><span>|</span><a href="#" class="active">EN</a>
                      </div>`;
        
        enHtml = enHtml.replace(langDivPattern, enLangReplacement);
        
        // Fast Translation Links Menu
        enHtml = enHtml.replace(/>Início<\/a>/g, '>Home</a>');
        enHtml = enHtml.replace(/>Serviços<\/a>/g, '>Services</a>');
        enHtml = enHtml.replace(/>Processo<\/a>/g, '>Process</a>');
        enHtml = enHtml.replace(/>Clientes<\/a>/g, '>Clients</a>');
        enHtml = enHtml.replace(/>Sobre<\/a>/g, '>About</a>');
        enHtml = enHtml.replace(/>Contacto<\/a>/g, '>Contact</a>');
        
        enHtml = enHtml.replace(/>Links Rápidos<\/h4>/g, '>Quick Links</h4>');
        enHtml = enHtml.replace(/>Serviços e Legal<\/h4>/g, '>Services & Legal</h4>');
        enHtml = enHtml.replace(/>Boletim<\/h4>/g, '>Newsletter</h4>');
        enHtml = enHtml.replace(/>Fique a par das últimas tendências em conteúdo visual e criatividade digital\.<\/p>/g, '>Stay updated with the latest trends in visual content and digital creativity.</p>');
        enHtml = enHtml.replace(/placeholder="O seu e-mail"/g, 'placeholder="Your email"');
        enHtml = enHtml.replace(/>Subscrever<\/button>/g, '>Subscribe</button>');
        enHtml = enHtml.replace(/>Vídeo & Cinema<\/a>/g, '>Video & Cinema</a>');
        enHtml = enHtml.replace(/>Transmissão<\/a>/g, '>Broadcasting</a>');
        enHtml = enHtml.replace(/>Termos e Condições<\/a>/g, '>Terms & Conditions</a>');
        enHtml = enHtml.replace(/>Política de Privacidade<\/a>/g, '>Privacy Policy</a>');

        // Path Links translation - very critical
        enHtml = enHtml.replace(/href="index\.html"/g, 'href="index-en.html"');
        enHtml = enHtml.replace(/href="index\.html#clients"/g, 'href="index-en.html#clients"');
        enHtml = enHtml.replace(/href="services\.html"/g, 'href="services-en.html"');
        enHtml = enHtml.replace(/href="process\.html"/g, 'href="process-en.html"');
        enHtml = enHtml.replace(/href="about\.html"/g, 'href="about-en.html"');
        enHtml = enHtml.replace(/href="contact\.html"/g, 'href="contact-en.html"');
        enHtml = enHtml.replace(/href="privacidade\.html"/g, 'href="privacidade-en.html"');
        enHtml = enHtml.replace(/href="termos\.html"/g, 'href="termos-en.html"');

        // Note: we can't translate heavy paragraph blocks mechanically safely, it's better to do titles/buttons/nav
        
        fs.writeFileSync(`${baseName}-en.html`, enHtml, 'utf8');
        console.log(`Created ${baseName}-en.html and wired EN switches`);
    });
}
createEnglishPages();
