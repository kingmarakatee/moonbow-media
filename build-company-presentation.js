const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

const LOGO_PATH = path.join(__dirname, 'logoAsset2.png');

const W = 1920;
const H = 1080;

const C = {
  black: rgb(0.04, 0.04, 0.05),
  darkGray: rgb(0.1, 0.1, 0.12),
  white: rgb(1, 1, 1),
  offWhite: rgb(0.96, 0.96, 0.96),
  accent: rgb(1, 0.35, 0.15),
  grayText: rgb(0.55, 0.55, 0.6),
  lightGray: rgb(0.9, 0.9, 0.9)
};

const STRINGS = {
  en: {
    filename: 'moonbow-presentation-en.pdf',
    docTitle: 'Moonbow - Visual Communication',
    coverTitle: 'SHAPING\nVISUAL\nCULTURE.',
    coverSub: 'Moonbow Corporate Profile // Creative Production & Broadcast Studio',
    
    challengeTitle: 'THE CHALLENGE.',
    challengeSub: 'The digital landscape is saturated.',
    challengeText: 'Attention is the new currency. In a world\nwhere everyone communicates, being noticed is not enough.\nYou need to be memorable. You need to create impact.',
    challengeFooter: 'Context',

    aboutTitle: 'WHO WE ARE.',
    aboutSub: 'Inspired by the rare beauty of the night.',
    aboutText: 'Born in Vila do Conde, our name is inspired by the rare\nmoonbow phenomenon. We combine advanced technique\nwith artistic sensitivity to turn visions into reality with\nuncompromised cinematic quality.',
    aboutFooter: 'About Us',

    approachTitle: 'OUR APPROACH.',
    approachSub: 'Art meets technique.',
    approachText: 'We don\'t just make videos. We build\nbrands through movement, color, and sound.\nA perfect union between technical rigor\nand artistic vision.',
    approachFooter: 'Strategy',

    valuesTitle: 'OUR VALUES.',
    valuesSub: 'The pillars of our execution.',
    values: [
      { t: 'EXCELLENCE', d: 'Quality is non-negotiable.' },
      { t: 'INNOVATION', d: 'Always ahead of trends & tech.' },
      { t: 'SPEED', d: 'Agility with professional precision.' },
      { t: 'PARTNERSHIP', d: 'Your success is our success.' }
    ],
    valuesFooter: 'Core Principles',

    manifestoTitle: 'WE BELIEVE.',
    manifestoText: 'In a noisy world, precision and cinematic\ncraft cut through the static. We build\naudiovisual experiences that command\nattention and drive results.',
    manifestoFooter: 'Mission & Vision',

    servicesTitle: 'WHAT WE DO.',
    servicesSub: 'Core disciplines engineered for modern brands.',
    cards: [
      { num: '01', title: 'Cinema & Video', list: ['Commercials & Brand Films', 'Documentary Production', 'High-end Event Coverage', 'Color Grading & Finishing'] },
      { num: '02', title: 'Live Broadcast', list: ['Multi-camera Systems', 'Real-time Playout Operations', 'Webinar & Stream Engineering', 'Global Syndication'] },
      { num: '03', title: 'Motion & Design', list: ['Visual Identity Architecture', '2D & 3D Motion Graphics', 'Broadcast On-Air Packages', 'Scenography Integration'] }
    ],
    servicesFooter: 'Our Expertise',

    workTitle: 'INDUSTRIES.',
    workSub: 'Where we create impact.',
    workBoxes: ['CORPORATE & BRANDS', 'EVENTS', 'CULTURE & SPORTS'],
    workFooter: 'Sectors',

    processBgTitle: 'THE\nPROCESS.',
    processBgSub: 'METHODOLOGY',
    steps: [
      { num: 'I.', title: 'DISCOVERY', desc: 'Deep dive into objectives and target audience.' },
      { num: 'II.', title: 'CONCEPT', desc: 'Creative treatment and production planning.' },
      { num: 'III.', title: 'EXECUTION', desc: 'Shooting or live deployment with technical rigor.' },
      { num: 'IV.', title: 'DELIVERY', desc: 'Post-production polish and format mastery.' }
    ],
    processFooter: 'Execution Framework',

    metricsTitle: 'SCALE & REACH.',
    metricsSub: 'Powered by data and global standards.',
    metricsLabels: ['Delivery Standard', 'End-to-end Pipeline', 'Support Operations'],
    metricsFooter: 'Metrics',

    testimonialsTitle: 'TESTIMONIALS.',
    testimonialsSub: 'The trust of those who work with us.',
    testimonial1: '\"Moonbow completely transformed our event.\nProfessionals from start to finish!\"',
    testimonial1Author: '- Events Director, Technova Solutions',
    testimonial2: '\"They captured moments we didn\'t even know\nwere being filmed. Cinematic and moving.\"',
    testimonial2Author: '- Wedding Client, Vila do Conde',
    testimonialsFooter: 'Clients',

    ctaTitle: 'LET\'S TALK.',
    dateText: 'MOONBOW MEDIA 2026'
  },
  pt: {
    filename: 'apresentacao-moonbow-pt.pdf',
    docTitle: 'Moonbow - Comunicação Visual',
    coverTitle: 'MOLDAR A\nCULTURA\nVISUAL.',
    coverSub: 'Perfil Corporativo Moonbow // Produção Criativa & Estúdio Broadcast',
    
    challengeTitle: 'O DESAFIO.',
    challengeSub: 'A paisagem digital está saturada.',
    challengeText: 'A atenção é a nova moeda de troca. Num mundo\nonde todos comunicam, ser notado já não é suficiente.\nÉ preciso ser memorável. É preciso criar impacto.',
    challengeFooter: 'Contexto',

    aboutTitle: 'QUEM SOMOS.',
    aboutSub: 'Inspirados pela beleza rara da noite.',
    aboutText: 'Nascidos em Vila do Conde, o nosso nome inspira-se no raro\nfenómeno do arco-íris lunar. Combinamos técnica avançada\ncom sensibilidade artística para transformar visões em\nrealidade com qualidade cinematográfica.',
    aboutFooter: 'Sobre Nós',

    approachTitle: 'A NOSSA ABORDAGEM.',
    approachSub: 'Arte encontra técnica.',
    approachText: 'Não fazemos apenas vídeos. Construímos\nmarcas através do movimento, cor e som.\nUma união perfeita entre o rigor técnico\ne a visão artística.',
    approachFooter: 'Estratégia',

    valuesTitle: 'OS NOSSOS VALORES.',
    valuesSub: 'Os pilares da nossa execução.',
    values: [
      { t: 'EXCELÊNCIA', d: 'Qualidade é não-negociável.' },
      { t: 'INOVAÇÃO', d: 'Sempre à frente das tendências.' },
      { t: 'RAPIDEZ', d: 'Agilidade com precisão técnica.' },
      { t: 'PARCERIA', d: 'O vosso sucesso é o nosso.' }
    ],
    valuesFooter: 'Princípios',

    manifestoTitle: 'ACREDITAMOS.',
    manifestoText: 'Num mundo ruidoso, a precisão e a\narte cinematográfica destacam-se. Criamos\nexperiências audiovisuais que captam a\natenção e geram resultados.',
    manifestoFooter: 'Missão & Visão',

    servicesTitle: 'O QUE FAZEMOS.',
    servicesSub: 'Disciplinas centrais desenvolvidas para marcas modernas.',
    cards: [
      { num: '01', title: 'Cinema & Vídeo', list: ['Comerciais & Filmes de Marca', 'Produção de Documentários', 'Cobertura de Eventos Premium', 'Correção de Cor & Finalização'] },
      { num: '02', title: 'Transmissão Ao Vivo', list: ['Sistemas Multicâmara', 'Operações de Playout', 'Engenharia de Streaming', 'Distribuição Global'] },
      { num: '03', title: 'Motion & Design', list: ['Arquitetura de Identidade Visual', 'Motion Graphics 2D & 3D', 'Pacotes Gráficos On-Air', 'Integração Cenográfica'] }
    ],
    servicesFooter: 'A Nossa Especialidade',

    workTitle: 'SETORES.',
    workSub: 'Onde criamos impacto.',
    workBoxes: ['CORPORATE & MARCAS', 'EVENTOS', 'CULTURA & DESPORTO'],
    workFooter: 'Áreas de Atuação',

    processBgTitle: 'O\nPROCESSO.',
    processBgSub: 'METODOLOGIA',
    steps: [
      { num: 'I.', title: 'DESCOBERTA', desc: 'Análise profunda dos objetivos e público-alvo.' },
      { num: 'II.', title: 'CONCEITO', desc: 'Tratamento criativo e planeamento de produção.' },
      { num: 'III.', title: 'EXECUÇÃO', desc: 'Filmagem ou transmissão com rigor técnico.' },
      { num: 'IV.', title: 'ENTREGA', desc: 'Pós-produção e masterização de formatos.' }
    ],
    processFooter: 'Estrutura de Execução',

    metricsTitle: 'ESCALA & ALCANCE.',
    metricsSub: 'Suportado por dados e padrões globais.',
    metricsLabels: ['Padrão de Entrega', 'Pipeline End-to-end', 'Operações de Suporte'],
    metricsFooter: 'Métricas',

    testimonialsTitle: 'TESTEMUNHOS.',
    testimonialsSub: 'A confiança de quem trabalha connosco.',
    testimonial1: '\"A Moonbow transformou completamente o nosso evento.\nProfissionais do início ao fim!\"',
    testimonial1Author: '- Diretor de Eventos, Technova Solutions',
    testimonial2: '\"Capturaram momentos que nem sabíamos que estavam\na ser filmados. Cinematográfico e emocionante.\"',
    testimonial2Author: '- Casamento em Vila do Conde',
    testimonialsFooter: 'Clientes',

    ctaTitle: 'VAMOS\nFALAR.',
    dateText: 'MOONBOW MEDIA 2026'
  }
};

function drawGrid(page) {
  for(let i=1; i<10; i++) {
    page.drawLine({ start: { x: (W/10)*i, y: 0 }, end: { x: (W/10)*i, y: H }, thickness: 1, color: rgb(0.93, 0.93, 0.93) });
    page.drawLine({ start: { x: 0, y: (H/10)*i }, end: { x: W, y: (H/10)*i }, thickness: 1, color: rgb(0.93, 0.93, 0.93) });
  }
}

function drawDarkGrid(page) {
  for(let i=1; i<10; i++) {
    page.drawLine({ start: { x: (W/10)*i, y: 0 }, end: { x: (W/10)*i, y: H }, thickness: 1, color: rgb(0.08, 0.08, 0.09) });
    page.drawLine({ start: { x: 0, y: (H/10)*i }, end: { x: W, y: (H/10)*i }, thickness: 1, color: rgb(0.08, 0.08, 0.09) });
  }
}

function drawHeader(page, title, subtitle, isDark = false) {
  page.drawText(title, { x: 120, y: H - 200, size: 75, color: isDark ? C.white : C.black });
  if (subtitle) {
    page.drawText(subtitle, { x: 125, y: H - 250, size: 28, color: C.accent });
  }
}

function drawFooter(page, text, isDark = false, sWhite = null, sBlack = null) {
    page.drawLine({
      start: { x: 120, y: 80 },
      end: { x: W - 120, y: 80 },
      thickness: 2,
      color: isDark ? C.darkGray : C.lightGray
    });
    page.drawText(text.toUpperCase(), { x: 120, y: 50, size: 14, color: isDark ? C.grayText : C.grayText });

    const logoToUse = isDark ? sWhite : sBlack;
    if (logoToUse) {
      const targetWidth = 150;
      const scaleToUse = targetWidth / logoToUse.width;
      const scaled = logoToUse.scale(scaleToUse);
      // Place it at the top right
      page.drawImage(logoToUse, {
        x: W - 120 - scaled.width,
        y: H - 80 - scaled.height,
        width: scaled.width,
        height: scaled.height
      });
      // Place 2026 at the bottom right
      page.drawText('2026', { x: W - 160, y: 50, size: 14, color: isDark ? C.grayText : C.grayText });
    } else {
      page.drawText('2026', { x: W - 160, y: 50, size: 14, color: isDark ? C.grayText : C.grayText });
    }
}

  function drawEditorialCard(page, x, y, width, height, number, title, textLines) {
  page.drawRectangle({ x, y, width, height, color: C.white });
  page.drawLine({ start: {x, y: y+height}, end: {x: x+width, y: y+height}, thickness: 6, color: C.accent });
  page.drawText(number, { x: x + 40, y: y + height - 80, size: 60, color: C.lightGray });
  page.drawText(title, { x: x + 40, y: y + height - 150, size: 36, color: C.black });
  
  let currentY = y + height - 220;
  for(const line of textLines) {
    page.drawCircle({ x: x + 48, y: currentY + 8, size: 4, color: C.accent });
    page.drawText(line, { x: x + 65, y: currentY, size: 22, color: C.grayText });
    currentY -= 40;
  }
}

async function buildPDF(lang) {
  const t = STRINGS[lang];
  const OUT = path.join(__dirname, t.filename);

  const pdf = await PDFDocument.create();
  const fontRegular = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  pdf.setTitle(t.docTitle);

  let logoImageColor = null;
  if(fs.existsSync(LOGO_PATH)) {
    logoImageColor = await pdf.embedPng(fs.readFileSync(LOGO_PATH));
  }

  let logoImageBlack = null;
  const BLACK_LOGO_PATH = path.join(__dirname, 'logoAsset2-black.png');
  if(fs.existsSync(BLACK_LOGO_PATH)) {
      logoImageBlack = await pdf.embedPng(fs.readFileSync(BLACK_LOGO_PATH));
  }
    let smallLogoWhite = null;
    let smallLogoBlack = null;
    const SMALL_WHITE_PATH = path.join(__dirname, 'images', 'pdf', 'smalllogo-white.png');
    const SMALL_BLACK_PATH = path.join(__dirname, 'images', 'pdf', 'smalllogo-black.png');
    
    if(fs.existsSync(SMALL_WHITE_PATH)) smallLogoWhite = await pdf.embedPng(fs.readFileSync(SMALL_WHITE_PATH));
    if(fs.existsSync(SMALL_BLACK_PATH)) smallLogoBlack = await pdf.embedPng(fs.readFileSync(SMALL_BLACK_PATH));


  let corporateImg = null;
  const CORP_JPG = path.join(__dirname, 'images', 'pdf', 'corporate.jpg');
  const CORP_PNG = path.join(__dirname, 'images', 'pdf', 'corporate.png');
  if(fs.existsSync(CORP_JPG)) {
      corporateImg = await pdf.embedJpg(fs.readFileSync(CORP_JPG));
  } else if(fs.existsSync(CORP_PNG)) {
      corporateImg = await pdf.embedPng(fs.readFileSync(CORP_PNG));
  }

  let eventImg = null;
  const EVENT_JPG = path.join(__dirname, 'images', 'pdf', 'event.jpg');
  const EVENT_PNG = path.join(__dirname, 'images', 'pdf', 'event.png');
  if(fs.existsSync(EVENT_JPG)) {
      eventImg = await pdf.embedJpg(fs.readFileSync(EVENT_JPG));
  } else if(fs.existsSync(EVENT_PNG)) {
      eventImg = await pdf.embedPng(fs.readFileSync(EVENT_PNG));
  }

  let cultureImg = null;
  const CULTURE_JPG = path.join(__dirname, 'images', 'pdf', 'culture.jpg');
  const CULTURE_PNG = path.join(__dirname, 'images', 'pdf', 'culture.png');
  if(fs.existsSync(CULTURE_JPG)) {
      cultureImg = await pdf.embedJpg(fs.readFileSync(CULTURE_JPG));
  } else if(fs.existsSync(CULTURE_PNG)) {
      cultureImg = await pdf.embedPng(fs.readFileSync(CULTURE_PNG));
  }

  // 1: Cover
  {
    const page = pdf.addPage([W, H]);
    page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.offWhite });
    drawGrid(page);

    // Decorative shapes
    page.drawCircle({ x: W, y: H / 2 - 100, size: 800, color: C.accent });
    page.drawCircle({ x: 100, y: -200, size: 500, color: C.white });

    // Logo
    const targetWidth = W - 240; // Full margin-to-margin width
    if(logoImageBlack) {
        const scaleToUse = targetWidth / logoImageBlack.width;
        const scaledH = logoImageBlack.height * scaleToUse;
        page.drawImage(logoImageBlack, { x: 120, y: H - 120 - scaledH, width: targetWidth, height: scaledH });
      } else if (logoImageColor) {
        const scaleToUse = targetWidth / logoImageColor.width;
        const scaledH = logoImageColor.height * scaleToUse;
        page.drawImage(logoImageColor, { x: 120, y: H - 120 - scaledH, width: targetWidth, height: scaledH });
    }

    // Title
    page.setFont(fontBold);
    page.drawText(t.coverTitle, { x: 120, y: H - 530, size: 140, color: C.black, lineHeight: 125 });
    
    // Subtitle & Footer line
    page.setFont(fontRegular);
    page.drawText(t.coverSub, { x: 120, y: 160, size: 30, color: C.grayText });
    page.drawLine({ start: {x: 120, y: 120}, end: {x: W - 120, y: 120}, thickness: 2, color: C.black });
  }

  // 2: Challenge
  {
    const page = pdf.addPage([W, H]);
    page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.black });
    drawDarkGrid(page);
    
    page.setFont(fontBold);
    drawHeader(page, t.challengeTitle, t.challengeSub, true);

    page.setFont(fontRegular);
    page.drawText(t.challengeText, { x: 125, y: H - 450, size: 55, color: C.white, lineHeight: 80 });
    
    drawFooter(page, t.challengeFooter, true, smallLogoWhite, smallLogoBlack);
  }

  // 3: About
  {
    const page = pdf.addPage([W, H]);
    page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.white });
    drawGrid(page);

    page.setFont(fontBold);
    drawHeader(page, t.aboutTitle, t.aboutSub, false);

    page.setFont(fontRegular);
    page.drawText(t.aboutText, { x: 125, y: H - 450, size: 50, color: C.darkGray, lineHeight: 70 });
    page.drawLine({ start: {x: 125, y: H - 800}, end: {x: 400, y: H - 800}, thickness: 8, color: C.accent });

    drawFooter(page, t.aboutFooter, false, smallLogoWhite, smallLogoBlack);
  }

  // 4: Approach
  {
    const page = pdf.addPage([W, H]);
    page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.offWhite });
    page.drawCircle({ x: W - 100, y: 300, size: 500, color: C.accent, opacity: 0.1 }); // Large subtle circle
    
    page.setFont(fontBold);
    drawHeader(page, t.approachTitle, t.approachSub, false);

    page.setFont(fontRegular);
    page.drawText(t.approachText, { x: 125, y: H - 450, size: 50, color: C.darkGray, lineHeight: 70 });
    
    drawFooter(page, t.approachFooter, false, smallLogoWhite, smallLogoBlack);
  }

  // 5: Values
  {
    const page = pdf.addPage([W, H]);
    page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.white });

    page.setFont(fontBold);
    drawHeader(page, t.valuesTitle, t.valuesSub, false);

    const cW = 380;
    let cX = 120;

    for(let i=0; i<4; i++) {
        page.drawRectangle({ x: cX, y: 300, width: cW, height: 400, color: C.offWhite });
        page.drawLine({ start: {x: cX, y: 700}, end: {x: cX + cW, y: 700}, thickness: 6, color: C.black });
        
        page.setFont(fontBold);
        page.drawText(t.values[i].t, { x: cX + 40, y: 620, size: 32, color: C.accent });
        
        page.setFont(fontRegular);
        page.drawText(t.values[i].d, { x: cX + 40, y: 550, size: 24, color: C.grayText, maxWidth: 300, lineHeight: 32 });
        
        cX += cW + 40;
    }

    drawFooter(page, t.valuesFooter, false, smallLogoWhite, smallLogoBlack);
  }

  // 6: Manifesto
  {
    const page = pdf.addPage([W, H]);
    page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.black });
    drawDarkGrid(page);

    page.setFont(fontBold);
    page.drawText(t.manifestoTitle, { x: 120, y: H - 250, size: 80, color: C.accent });
    
    page.setFont(fontRegular);
    page.drawText(t.manifestoText, { x: 125, y: H - 400, size: 65, color: C.white, lineHeight: 85 });
    
    drawFooter(page, t.manifestoFooter, true, smallLogoWhite, smallLogoBlack);
  }

  // 7: Services
  {
    const page = pdf.addPage([W, H]);
    page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.offWhite });

    page.setFont(fontBold);
    drawHeader(page, t.servicesTitle, t.servicesSub);

    page.setFont(fontRegular);
    const cardY = 250;
    const cardH = 500;

    drawEditorialCard(page, 120, cardY, 520, cardH, t.cards[0].num, t.cards[0].title, t.cards[0].list);
    drawEditorialCard(page, 700, cardY, 520, cardH, t.cards[1].num, t.cards[1].title, t.cards[1].list);
    drawEditorialCard(page, 1280, cardY, 520, cardH, t.cards[2].num, t.cards[2].title, t.cards[2].list);

    drawFooter(page, t.servicesFooter, false, smallLogoWhite, smallLogoBlack);
  }

  // 8: Portfolio / Selected Work
  {
    const page = pdf.addPage([W, H]);
    page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.darkGray });
    drawDarkGrid(page);
    
    page.setFont(fontBold);
    drawHeader(page, t.workTitle, t.workSub, true);

    const bW = 500;
    const bH = 350;
    let bX = 120;
    
    for(let i=0; i<3; i++) {
        page.drawRectangle({ x: bX, y: 350, width: bW, height: bH, color: C.black });
        
        let targetImg = null;
        if (i === 0) targetImg = corporateImg;
        if (i === 1) targetImg = eventImg;
        if (i === 2) targetImg = cultureImg;
        
        if (targetImg) {
            const imgDims = targetImg.scaleToFit(bW, bH);
            page.drawImage(targetImg, { 
                x: bX + (bW - imgDims.width)/2, 
                y: 350 + (bH - imgDims.height)/2, 
                width: imgDims.width, 
                height: imgDims.height 
            });
        } else {
            // Internal placeholder decoration
            page.drawCircle({ x: bX + bW/2, y: 350 + bH/2, size: 40, color: C.darkGray });
        }
        
        page.drawLine({ start: {x: bX, y: 350}, end: {x: bX + bW, y: 350}, thickness: 4, color: C.accent });
        page.drawLine({ start: {x: bX, y: 350+bH}, end: {x: bX + bW, y: 350+bH}, thickness: 4, color: C.white });
        
        page.setFont(fontBold);
        page.drawText(t.workBoxes[i], { x: bX + 30, y: 300, size: 24, color: C.white });
        
        bX += bW + 60;
    }
    
    drawFooter(page, t.workFooter, true, smallLogoWhite, smallLogoBlack);
  }

  // 9: Process
  {
    const page = pdf.addPage([W, H]);
    page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.white });

    page.drawRectangle({ x: 0, y: 0, width: W/2.5, height: H, color: C.black });

    page.setFont(fontBold);
    page.drawText(t.processBgTitle, { x: 120, y: H - 250, size: 100, color: C.white, lineHeight: 110 });
    page.drawText(t.processBgSub, { x: 125, y: H - 420, size: 24, color: C.accent });

    page.setFont(fontRegular);
    const startY = H - 200;
    const stepGap = 160;

    let currentY = startY;
    for(const step of t.steps) {
      page.setFont(fontBold);
      page.drawText(step.num, { x: W/2.5 + 100, y: currentY, size: 40, color: C.accent });
      page.drawText(step.title, { x: W/2.5 + 200, y: currentY, size: 40, color: C.black });
      
      page.setFont(fontRegular);
      page.drawText(step.desc, { x: W/2.5 + 200, y: currentY - 45, size: 28, color: C.grayText });
      
      currentY -= stepGap;
    }

    drawFooter(page, t.processFooter, false, smallLogoWhite, smallLogoBlack);
  }

  // 10: Numbers
  {
    const page = pdf.addPage([W, H]);
    page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.black });

    page.setFont(fontBold);
    drawHeader(page, t.metricsTitle, t.metricsSub, true);

    const drawHugeStat = (x, y, stat, label) => {
      page.setFont(fontBold);
      page.drawText(stat, { x, y, size: 140, color: C.accent });
      page.setFont(fontRegular);
      page.drawText(label, { x: x + 10, y: y - 60, size: 30, color: C.white });
    };

    drawHugeStat(200, 500, '4K+', t.metricsLabels[0]);
    drawHugeStat(850, 500, '360°', t.metricsLabels[1]);
    drawHugeStat(1450, 500, '24/7', t.metricsLabels[2]);

    drawFooter(page, t.metricsFooter, true, smallLogoWhite, smallLogoBlack);
  }

  // 11: Testimonials
  {
    const page = pdf.addPage([W, H]);
    page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.offWhite });
    
    page.setFont(fontBold);
    page.drawText('"', { x: 80, y: H - 350, size: 350, color: C.lightGray });
    
    drawHeader(page, t.testimonialsTitle, t.testimonialsSub, false);

    page.setFont(fontBold);
    page.drawText(t.testimonial1, { x: 250, y: H - 450, size: 42, color: C.black, lineHeight: 60 });
    page.setFont(fontRegular);
    page.drawText(t.testimonial1Author, { x: 250, y: H - 550, size: 24, color: C.accent });
    
    page.setFont(fontBold);
    page.drawText(t.testimonial2, { x: 250, y: H - 700, size: 42, color: C.black, lineHeight: 60 });
    page.setFont(fontRegular);
    page.drawText(t.testimonial2Author, { x: 250, y: H - 800, size: 24, color: C.accent });
    
    drawFooter(page, t.testimonialsFooter, false, smallLogoWhite, smallLogoBlack);
  }

  // 12: CTA
  {
    const page = pdf.addPage([W, H]);
    page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.accent });

    page.setFont(fontBold);
    page.drawText(t.ctaTitle, { x: 120, y: H - 350, size: 160, color: C.black, lineHeight: 140 });
    
    page.setFont(fontRegular);
    page.drawText('hello@moonbowmedia.pt', { x: 130, y: H - 650, size: 60, color: C.white });
    page.drawText('+351 912 345 678', { x: 130, y: H - 750, size: 60, color: C.white });
    page.drawText('moonbowmedia.pt', { x: 130, y: H - 850, size: 60, color: C.white });
    
    page.drawCircle({ x: W - 300, y: 300, size: 450, color: C.white, opacity: 0.1 });
    
    page.drawLine({
      start: { x: 120, y: 80 },
      end: { x: W - 120, y: 80 },
      thickness: 2,
      color: C.black
    });
    page.drawText(t.dateText, { x: 120, y: 50, size: 18, color: C.black });

      if (smallLogoWhite) {
        const targetWidth = 150;
        const scaleToUse = targetWidth / smallLogoWhite.width;
        const scaled = smallLogoWhite.scale(scaleToUse);
        page.drawImage(smallLogoWhite, {
          x: W - 120 - scaled.width,
          y: H - 80 - scaled.height,
          width: scaled.width,
          height: scaled.height
        });
      }
    }

  fs.writeFileSync(OUT, await pdf.save());
  console.log(`Presentation created: ${OUT}`);
}

async function buildAll() {
  await buildPDF('pt');
  await buildPDF('en');
}

buildAll().catch(err => {
  console.error(err);
  process.exit(1);
});
