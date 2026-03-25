const fs = require('fs');

// ======================================================================
// COMPREHENSIVE PT → EN TRANSLATION MAP
// Ordered longest-first to avoid partial replacements
// ======================================================================

const translations = [

    // ── META / TITLE ──────────────────────────────────────────────────
    ['lang="pt-PT"', 'lang="en"'],
    ['<meta name="description" content="Moonbow - A sua agência de comunicação e design que transforma momentos em arte interativa.">', '<meta name="description" content="Moonbow - Your communication and design agency that transforms moments into interactive art.">'],
    ['<meta property="og:description" content="Produtora audiovisual, design e transmissão. Colocamos as suas ideias em destaque.">', '<meta property="og:description" content="Audiovisual production, design and broadcasting. We put your ideas in the spotlight.">'],
    ['<title>Sobre | Moonbow', '<title>About | Moonbow'],
    ['<title>Serviços Detalhados | Moonbow', '<title>Detailed Services | Moonbow'],
    ['<title>Processo | Moonbow', '<title>Process | Moonbow'],
    ['<title>Contacto | Moonbow', '<title>Contact | Moonbow'],
    ['<title>Termos e Condições | Moonbow', '<title>Terms & Conditions | Moonbow'],
    ['<title>Política de Privacidade | Moonbow', '<title>Privacy Policy | Moonbow'],

    // ── NAV LINKS (present on all pages) ──────────────────────────────
    ['aria-label="Abrir menu"', 'aria-label="Open menu"'],
    ['>Início</a>', '>Home</a>'],
    ['>Serviços</a>', '>Services</a>'],
    ['>Processo</a>', '>Process</a>'],
    ['>Clientes</a>', '>Clients</a>'],
    ['>Sobre</a>', '>About</a>'],
    ['>Contacto</a>', '>Contact</a>'],

    // ── INDEX.HTML – HERO ─────────────────────────────────────────────
    ['Capturamos a beleza rara dos seus momentos com a mesma magia com que a lua pinta o céu noturno. Vídeo, transmissão e design que transcendem o comum.', 'We capture the rare beauty of your moments with the same magic the moon uses to paint the night sky. Video, broadcasting and design that transcend the ordinary.'],
    ['>Ilumine o seu projeto<', '>Light up your project<'],
    ['>Explorar Serviços<', '>Explore Services<'],
    ['>Descarregar Apresentação<', '>Download Presentation<'],
    ['apresentacao-moonbow-pt.pdf', 'moonbow-presentation-en.pdf'],

    // ── INDEX.HTML – SERVICES SECTION ─────────────────────────────────
    ['>Os Nossos Serviços</h2>', '>Our Services</h2>'],
    ['Soluções inovadoras para transformar a sua visão em realidade visual impressionante', 'Innovative solutions to transform your vision into stunning visual reality'],
    ['>Vídeo &amp; Cinema</h3>', '>Video &amp; Cinema</h3>'],
    ['>Vídeo & Cinema</h3>', '>Video & Cinema</h3>'],
    ['Produção cinematográfica que transforma momentos em histórias memoráveis.', 'Cinematic production that transforms moments into memorable stories.'],
    ['>Videografia de Eventos<', '>Event Videography<'],
    ['>Produção Cinematográfica<', '>Film Production<'],
    ['>Vídeo Institucional<', '>Corporate Video<'],
    ['>Documentários<', '>Documentaries<'],
    ['>Saber Mais<', '>Learn More<'],
    ['>Solicitar<', '>Request<'],
    ['>Transmissão</h3>', '>Broadcasting</h3>'],
    ['Transmissão profissional ao vivo para eventos, conferências e produções especiais.', 'Professional live broadcasting for events, conferences and special productions.'],
    ['>Transmissão Ao Vivo<', '>Live Broadcasting<'],
    ['>Produção Multi-Câmara<', '>Multi-Camera Production<'],
    ['>Streaming Profissional<', '>Professional Streaming<'],
    ['>Serviços de Satélite<', '>Satellite Services<'],
    ['>Webinars &amp; Conferências<', '>Webinars &amp; Conferences<'],
    ['>Webinars & Conferências<', '>Webinars & Conferences<'],
    ['>Design &amp; Motion</h3>', '>Design &amp; Motion</h3>'],
    ['Design visual e motion graphics que elevam a sua marca e comunicação.', 'Visual design and motion graphics that elevate your brand and communication.'],
    ['>Identidade Visual<', '>Visual Identity<'],
    ['>Design de Cenários<', '>Set Design<'],
    ['>Pós-produção &amp; Grading<', '>Post-production &amp; Grading<'],
    ['>Pós-produção & Grading<', '>Post-production & Grading<'],
    ['>Branding Completo<', '>Full Branding<'],

    // ── INDEX.HTML – CLIENTS ──────────────────────────────────────────
    ['>Alguns Clientes</h2>', '>Some of Our Clients</h2>'],

    // ── INDEX.HTML – TESTIMONIALS ─────────────────────────────────────
    ['>Testemunhos</h2>', '>Testimonials</h2>'],
    ['"A Moonbow transformou completamente o nosso evento. A transmissão ao vivo foi perfeita e o feedback dos participantes foi excelente. Profissionais do início ao fim!"', '"Moonbow completely transformed our event. The live broadcast was flawless and participant feedback was excellent. Professionals from start to finish!"'],
    ['Diretor de Eventos, Technova Solutions', 'Events Director, Technova Solutions'],
    ['"O vídeo do nosso casamento foi absolutamente perfeito. Capturaram momentos que nem sabíamos que estavam a ser filmados. A edição é cinematográfica e emocionante. Valeu cada cêntimo!"', '"Our wedding video was absolutely perfect. They captured moments we didn\'t even know were being filmed. The editing is cinematic and moving. Worth every penny!"'],
    ['Casamento em Vila do Conde', 'Wedding in Vila do Conde'],
    ['"Como startup, precisávamos de uma identidade visual forte. A Moonbow não só criou um design incrível como nos ajudou a contar a nossa história através do vídeo. Parceiros excecionais!"', '"As a startup, we needed a strong visual identity. Moonbow not only created an incredible design but also helped us tell our story through video. Exceptional partners!"'],

    // ── INDEX.HTML – FEATURES BAR ─────────────────────────────────────
    ['>Ultrarrápido</h4>', '>Ultra-Fast</h4>'],
    ['Entrega acelerada sem comprometer qualidade', 'Accelerated delivery without compromising quality'],
    ['>Suporte 24/7</h4>', '>24/7 Support</h4>'],
    ['Sempre disponíveis para as suas dúvidas', 'Always available for your questions'],
    ['>Revisões</h4>', '>Revisions</h4>'],
    ['Temos o objetivo de deixar o cliente 100% satisfeito', 'Our goal is to leave the client 100% satisfied'],

    // ── INDEX.HTML – CTA SECTION ──────────────────────────────────────
    ['>Pronto para transformar a sua visão?</h2>', '>Ready to transform your vision?</h2>'],
    ['Junte-se aos clientes que confiaram em nós para criar conteúdo visual extraordinário. Vamos iluminar o seu projeto com a magia da Moonbow.', 'Join the clients who trusted us to create extraordinary visual content. Let us light up your project with the magic of Moonbow.'],
    ['>Começar Projeto<', '>Start Project<'],

    // ── FOOTER (shared) ───────────────────────────────────────────────
    ['Capturamos a magia dos seus momentos com técnica e sensibilidade artística.', 'We capture the magic of your moments with technique and artistic sensitivity.'],
    ['>Telefone:</strong>', '>Phone:</strong>'],
    ['>Links Rápidos</h4>', '>Quick Links</h4>'],
    ['>Serviços e Legal</h4>', '>Services &amp; Legal</h4>'],
    ['>Vídeo &amp; Cinema</a>', '>Video &amp; Cinema</a>'],
    ['>Vídeo & Cinema</a>', '>Video & Cinema</a>'],
    ['>Transmissão</a>', '>Broadcasting</a>'],
    ['>Termos e Condições</a>', '>Terms &amp; Conditions</a>'],
    ['>Política de Privacidade</a>', '>Privacy Policy</a>'],
    ['>Boletim</h4>', '>Newsletter</h4>'],
    ['Fique a par das últimas tendências em conteúdo visual e criatividade digital.', 'Stay updated with the latest trends in visual content and digital creativity.'],
    ['placeholder="O seu e-mail"', 'placeholder="Your email"'],
    ['>Subscrever</button>', '>Subscribe</button>'],
    ['Todos os direitos reservados.', 'All rights reserved.'],
    ['title="Voltar ao topo"', 'title="Back to top"'],

    // ── FABs ──────────────────────────────────────────────────────────
    ['>Ligar</span>', '>Call</span>'],
    // E-mail / Contacto tooltips – "E-mail" stays, "Contacto" already handled above

    // ── ABOUT.HTML ────────────────────────────────────────────────────
    ['>Sobre a Moonbow</h1>', '>About Moonbow</h1>'],
    ['Inspirados pela beleza rara da noite. Onde a luz encontra a escuridão para criar magia visual extraordinária.', 'Inspired by the rare beauty of the night. Where light meets darkness to create extraordinary visual magic.'],
    ['>Inspirados pela beleza rara da noite</h2>', '>Inspired by the rare beauty of the night</h2>'],
    ['A Moonbow nasceu em Vila do Conde, no coração do Norte de Portugal, onde o Atlântico encontra o céu estrelado. O nosso nome inspira-se no fenómeno raro do moonbow - o arco-íris lunar - que simboliza a magia que acontece quando a luz encontra a escuridão.', 'Moonbow was born in Vila do Conde, in the heart of Northern Portugal, where the Atlantic meets the starry sky. Our name is inspired by the rare moonbow phenomenon — the lunar rainbow — which symbolises the magic that happens when light meets darkness.'],
    ['Especializamo-nos em capturar momentos com a mesma beleza efémera e impactante, combinando técnica avançada com sensibilidade artística. Cada projeto é uma oportunidade para criar algo verdadeiramente memorável.', 'We specialise in capturing moments with the same ephemeral and impactful beauty, combining advanced technique with artistic sensitivity. Every project is an opportunity to create something truly memorable.'],
    ['Desde a nossa fundação, temos trabalhado com empresas, criadores de conteúdo e personalidades que compartilham a nossa paixão por excelência visual. O nosso compromisso é simples: transformar visões em realidade com qualidade cinematográfica.', 'Since our founding, we have worked with companies, content creators and personalities who share our passion for visual excellence. Our commitment is simple: turning visions into reality with cinematic quality.'],
    ['>Os Nossos Valores</h2>', '>Our Values</h2>'],
    ['>Excelência</h3>', '>Excellence</h3>'],
    ['Cada projeto recebe o nosso melhor - desde o conceito inicial até à entrega final. Qualidade é não-negociável.', 'Every project receives our best — from the initial concept to the final delivery. Quality is non-negotiable.'],
    ['>Inovação</h3>', '>Innovation</h3>'],
    ['Estamos sempre à frente das tendências, explorando novas técnicas e tecnologias para oferecer resultados únicos.', 'We are always ahead of the trends, exploring new techniques and technologies to deliver unique results.'],
    ['>Paixão</h3>', '>Passion</h3>'],
    ['Amamos o que fazemos. Esta paixão transpira em cada frame, cada cor, cada movimento dos nossos trabalhos.', 'We love what we do. This passion shines through in every frame, every colour, every movement of our work.'],
    ['>Parcerias</h3>', '>Partnerships</h3>'],
    ['Vemos cada cliente como um parceiro. O vosso sucesso é o nosso sucesso. Crescemos juntos.', 'We see every client as a partner. Your success is our success. We grow together.'],
    ['>Rapidez</h3>', '>Speed</h3>'],
    ['Sem comprometer qualidade. Entregamos com agilidade, cumprindo prazos com precisão profissional.', 'Without compromising quality. We deliver with agility, meeting deadlines with professional precision.'],
    ['>Confiança</h3>', '>Trust</h3>'],
    ['Confidencialidade e transparência são pilares. Confiamos nos nossos clientes e eles confiam em nós.', 'Confidentiality and transparency are pillars. We trust our clients and they trust us.'],

    // ── SERVICES.HTML (detailed) ──────────────────────────────────────
    ['Produção cinematográfica de alta qualidade que transforma momentos e histórias em conteúdo visual memorável. Utilizamos equipamento profissional e técnicas avançadas para capturar a essência do seu projeto.', 'High-quality cinematic production that transforms moments and stories into memorable visual content. We use professional equipment and advanced techniques to capture the essence of your project.'],
    ['>Videografia de Eventos</h5>', '>Event Videography</h5>'],
    ['Captura completa de eventos corporativos, casamentos, conferências e celebrações com múltiplas câmaras e edição profissional.', 'Complete coverage of corporate events, weddings, conferences and celebrations with multiple cameras and professional editing.'],
    ['>Produção Cinematográfica</h5>', '>Film Production</h5>'],
    ['Filmes e vídeos de ficção com produção completa, roteiro, direção, fotografia e pós-produção de cinema.', 'Fiction films and videos with full production, screenplay, direction, cinematography and cinema post-production.'],
    ['>Vídeo Institucional</h5>', '>Corporate Video</h5>'],
    ['Vídeos corporativos que apresentam a sua empresa, valores e serviços de forma profissional e impactante.', 'Corporate videos that showcase your company, values and services in a professional and impactful way.'],
    ['>Documentários</h5>', '>Documentaries</h5>'],
    ['Produção de documentários que contam histórias reais com profundidade, investigação e estilo cinematográfico.', 'Documentary production that tells real stories with depth, research and cinematic style.'],
    ['>Edição &amp; Pós-Produção</h5>', '>Editing &amp; Post-Production</h5>'],
    ['>Edição & Pós-Produção</h5>', '>Editing & Post-Production</h5>'],
    ['Edição profissional, color grading cinematográfico e sound design para transformar o seu material bruto.', 'Professional editing, cinematic colour grading and sound design to transform your raw footage.'],
    ['>Solicitar Orçamento<', '>Request Quote<'],
    ['Transmissão profissional ao vivo de eventos, conferências, shows e produções especiais. Possuímos infraestrutura de última geração para garantir qualidade de transmissão em qualquer situação.', 'Professional live broadcasting of events, conferences, shows and special productions. We have state-of-the-art infrastructure to ensure broadcast quality in any situation.'],
    ['>Transmissão Ao Vivo</h5>', '>Live Broadcasting</h5>'],
    ['Streaming em HD/4K para múltiplas plataformas com fibra óptica de alta velocidade garantindo zero latência.', 'HD/4K streaming to multiple platforms with high-speed fibre optics ensuring zero latency.'],
    ['>Produção Multi-Câmara</h5>', '>Multi-Camera Production</h5>'],
    ['Sistema de múltiplas câmaras com switching em tempo real, efeitos especiais e transições profissionais.', 'Multi-camera system with real-time switching, special effects and professional transitions.'],
    ['>Streaming Profissional</h5>', '>Professional Streaming</h5>'],
    ['Integração com plataformas (YouTube, Facebook, LinkedIn, Twitch) com controle total de qualidade e estatísticas.', 'Integration with platforms (YouTube, Facebook, LinkedIn, Twitch) with full quality control and statistics.'],
    ['>Suporte Técnico 24/7</h5>', '>24/7 Technical Support</h5>'],
    ['Equipa técnica disponível continuamente para monitorizar e resolver qualquer problema durante a transmissão.', 'Technical team continuously available to monitor and resolve any issues during the broadcast.'],
    ['Design visual de impacto e motion graphics que elevam a sua marca e comunicação audiovisual. Criamos identidades visuais coerentes e conteúdo animado que captura atenção.', 'Impactful visual design and motion graphics that elevate your brand and audiovisual communication. We create coherent visual identities and animated content that captures attention.'],
    ['>Identidade Visual</h5>', '>Visual Identity</h5>'],
    ['Design completo de marca: logo, paleta cromática, tipografia, guidelines e aplicações em vários suportes.', 'Complete brand design: logo, colour palette, typography, guidelines and applications across various media.'],
    ['>Motion Graphics</h5>', '>Motion Graphics</h5>'],
    ['Animações profissionais, intros, outros e graphics para vídeos que aumentam engagement e comunicação visual.', 'Professional animations, intros, outros and graphics for videos that increase engagement and visual communication.'],
    ['>Design de Cenários</h5>', '>Set Design</h5>'],
    ['Criação de cenários virtuais, estúdios verdes e ambientes imersivos para produções profissionais.', 'Creation of virtual sets, green studios and immersive environments for professional productions.'],
    ['>Pós-produção &amp; Grading</h5>', '>Post-production &amp; Grading</h5>'],
    ['>Pós-produção & Grading</h5>', '>Post-production & Grading</h5>'],
    ['Color grading cinematográfico, efeitos visuais, composição e tratamento profissional de imagem.', 'Cinematic colour grading, visual effects, compositing and professional image processing.'],
    ['>Branding Completo</h5>', '>Full Branding</h5>'],
    ['Estratégia visual integrada: marca, website, redes sociais, materiais impressos e conteúdo audiovisual.', 'Integrated visual strategy: brand, website, social media, printed materials and audiovisual content.'],

    // ── PROCESS.HTML ──────────────────────────────────────────────────
    ['>O Nosso Processo</h1>', '>Our Process</h1>'],
    ['Uma jornada cuidadosamente estruturada para transformar a sua visão em realidade', 'A carefully structured journey to transform your vision into reality'],
    ['>Como Funciona</h2>', '>How It Works</h2>'],
    ['Seis passos simples para criar conteúdo visual extraordinário', 'Six simple steps to create extraordinary visual content'],
    ['>Descoberta</h4>', '>Discovery</h4>'],
    ['Entendemos profundamente a sua marca, objetivos e público-alvo através de conversas estratégicas.', 'We deeply understand your brand, goals and target audience through strategic conversations.'],
    ['>Conceito</h4>', '>Concept</h4>'],
    ['Desenvolvemos uma estratégia criativa única que alinha a sua visão com resultados mensuráveis.', 'We develop a unique creative strategy that aligns your vision with measurable results.'],
    ['>Produção</h4>', '>Production</h4>'],
    ['Executamos com precisão cinematográfica, usando equipamento de topo e técnicas inovadoras.', 'We execute with cinematic precision, using top-tier equipment and innovative techniques.'],
    ['>Pós-produção</h4>', '>Post-production</h4>'],
    ['Aperfeiçoamos cada detalhe com edição, color grading e sound design profissional.', 'We refine every detail with editing, colour grading and professional sound design.'],
    ['>Entrega</h4>', '>Delivery</h4>'],
    ['Fornecemos o seu projeto em múltiplos formatos, pronto para todas as plataformas.', 'We deliver your project in multiple formats, ready for all platforms.'],
    ['>Suporte</h4>', '>Support</h4>'],
    ['Oferecemos manutenção contínua e otimizações para maximizar o impacto do seu conteúdo.', 'We offer continuous maintenance and optimisations to maximise the impact of your content.'],

    // ── CONTACT.HTML ──────────────────────────────────────────────────
    ['>Contacte-nos</h1>', '>Contact Us</h1>'],
    ['Pronto para transformar a sua visão em realidade? Estamos aqui para ouvir as suas ideias.', 'Ready to transform your vision into reality? We are here to listen to your ideas.'],
    ['>Nome</label>', '>Name</label>'],
    ['>E-mail</label>', '>Email</label>'],
    ['>Serviço de Interesse</label>', '>Service of Interest</label>'],
    ['>Selecione um serviço</option>', '>Select a service</option>'],
    ['>Vídeo &amp; Cinema</option>', '>Video &amp; Cinema</option>'],
    ['>Vídeo & Cinema</option>', '>Video & Cinema</option>'],
    ['>Transmissão</option>', '>Broadcasting</option>'],
    ['>Design &amp; Motion</option>', '>Design &amp; Motion</option>'],
    ['>Design & Motion</option>', '>Design & Motion</option>'],
    ['>Consultoria</option>', '>Consulting</option>'],
    ['>Mensagem</label>', '>Message</label>'],
    ['>Enviar Mensagem<', '>Send Message<'],
    ['>Localização</h4>', '>Location</h4>'],
    ['>Telefone</h4>', '>Phone</h4>'],
    ['>E-mail</h4>', '>Email</h4>'],
    ['title="Clica para copiar"', 'title="Click to copy"'],

    // Contact JS alerts
    ['Por favor, preencha todos os campos obrigatórios.', 'Please fill in all required fields.'],
    ['Obrigado! A sua mensagem foi enviada. Entraremos em contacto brevemente.', 'Thank you! Your message has been sent. We will contact you shortly.'],
    ['Copiado! ✓', 'Copied! ✓'],

    // ── TERMOS.HTML ───────────────────────────────────────────────────
    ['>Voltar à página principal</a>', '>Back to homepage</a>'],
    ['>Termos e Condições</h1>', '>Terms & Conditions</h1>'],
    ['Última atualização: 4 de Março de 2026', 'Last updated: March 4, 2026'],
    ['>1. Introdução</h2>', '>1. Introduction</h2>'],
    ['Bem-vindo à Moonbow. Ao utilizar o nosso website e os nossos serviços de produção audiovisual, transmissão e design, concorda em cumprir e ficar vinculado aos seguintes Termos e Condições.', 'Welcome to Moonbow. By using our website and our audiovisual production, broadcasting and design services, you agree to comply with and be bound by the following Terms & Conditions.'],
    ['>2. Serviços</h2>', '>2. Services</h2>'],
    ['A Moonbow reserva-se o direito de modificar, suspender ou descontinuar qualquer serviço oferecido a qualquer momento, com ou sem aviso prévio. Os orçamentos fornecidos têm normalmente uma validade de 30 dias.', 'Moonbow reserves the right to modify, suspend or discontinue any service offered at any time, with or without prior notice. Quotes provided are typically valid for 30 days.'],
    ['>3. Propriedade Intelectual e Direitos de Autor</h2>', '>3. Intellectual Property & Copyright</h2>'],
    ['Todo o conteúdo criado pela Moonbow (incluindo, mas não limitado a vídeos, fotografias, designs e motion graphics) permanece propriedade da Moonbow até que o pagamento integral seja recebido. Após o pagamento, os direitos de utilização são transferidos para o cliente conforme o acordo estabelecido, reservando a Moonbow o direito de usar o material no seu portfólio, exceto em casos onde existe um Acordo de Confidencialidade (NDA).', 'All content created by Moonbow (including, but not limited to, videos, photographs, designs and motion graphics) remains the property of Moonbow until full payment is received. Upon payment, usage rights are transferred to the client as per the established agreement, with Moonbow reserving the right to use the material in its portfolio, except in cases where a Non-Disclosure Agreement (NDA) exists.'],
    ['>4. Obrigações do Cliente</h2>', '>4. Client Obligations</h2>'],
    ['O cliente concorda em fornecer todas as informações, acessos e autorizações necessárias (incluindo direitos de imagem de terceiros envolvidos) para que a nossa equipa possa executar os serviços contratados.', 'The client agrees to provide all necessary information, access and authorisations (including image rights of third parties involved) so that our team can execute the contracted services.'],
    ['>5. Pagamentos</h2>', '>5. Payments</h2>'],
    ['É exigido um sinal de adjudicação para confirmação de reservas de datas (habitualmente 40%).', 'A booking deposit is required to confirm date reservations (typically 40%).'],
    ['O pagamento final deverá ser realizado antes da entrega da versão final em alta resolução do projeto, salvo acordo em contrário.', 'Final payment must be made before delivery of the final high-resolution version of the project, unless otherwise agreed.'],
    ['>6. Política de Cancelamento</h2>', '>6. Cancellation Policy</h2>'],
    ['Cancelamentos com menos de 7 dias de antecedência face à data de gravação/produção podem resultar na retenção total ou parcial do sinal pago para cobrir custos de pré-produção e alocação de datas.', 'Cancellations with less than 7 days\' notice before the recording/production date may result in full or partial retention of the deposit paid to cover pre-production costs and date allocation.'],

    // ── PRIVACIDADE.HTML ──────────────────────────────────────────────
    ['>Política de Privacidade (RGPD)</h1>', '>Privacy Policy (GDPR)</h1>'],
    ['>1. Compromisso com a Privacidade</h2>', '>1. Commitment to Privacy</h2>'],
    ['A Moonbow respeita a sua privacidade. Esta política descreve como recolhemos, usamos, protegemos e gerimos os seus dados pessoais, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) da União Europeia.', 'Moonbow respects your privacy. This policy describes how we collect, use, protect and manage your personal data, in compliance with the European Union\'s General Data Protection Regulation (GDPR).'],
    ['>2. Que dados recolhemos?</h2>', '>2. What data do we collect?</h2>'],
    ['Através do nosso website (formulário de contacto, subscrição de newsletter e comunicação via email/WhatsApp), podemos recolher:', 'Through our website (contact form, newsletter subscription and communication via email/WhatsApp), we may collect:'],
    ['Nome e apelido.', 'First and last name.'],
    ['Endereço de email.', 'Email address.'],
    ['Número de telefone / WhatsApp.', 'Phone / WhatsApp number.'],
    ['Informações sobre eventos e necessidades do projeto.', 'Information about events and project needs.'],
    ['Imagens e vídeos capturados durante a prestação dos nossos serviços de audiovisual e transmissão.', 'Images and videos captured during the provision of our audiovisual and broadcasting services.'],
    ['>3. Como utilizamos os seus dados?</h2>', '>3. How do we use your data?</h2>'],
    ['Os seus dados são utilizados exclusivametne para:', 'Your data is used exclusively for:'],
    ['Responder a pedidos de orçamento e fornecer as informações solicitadas.', 'Responding to quote requests and providing the requested information.'],
    ['Executar e gerir o serviço de audiovisual que contratou.', 'Executing and managing the audiovisual service you contracted.'],
    ['Faturação e assuntos contabilísticos legais.', 'Billing and legal accounting matters.'],
    ['Ocasionalmente enviar-lhe a nossa newsletter, apenas caso tenha efetuado a subscrição explícita.', 'Occasionally sending you our newsletter, only if you have explicitly subscribed.'],
    ['>4. Partilha de Dados</h2>', '>4. Data Sharing</h2>'],
    ['A Moonbow <strong>não vende, aluga ou cede</strong> os seus dados pessoais a terceiros. Poderemos partilhar dados apenas com parceiros estritamente necessários para a operação do negócio (ex: serviços de alojamento web, software de faturação) que também cumprem o RGPD.', 'Moonbow <strong>does not sell, rent or share</strong> your personal data with third parties. We may share data only with partners strictly necessary for business operations (e.g., web hosting services, billing software) that also comply with GDPR.'],
    ['>5. Segurança e Armazenamento</h2>', '>5. Security & Storage</h2>'],
    ['Adotamos medidas técnicas e organizacionais adequadas para proteger os seus dados pessoais contra acesso, alteração ou destruição não autorizados. Os ficheiros de vídeo e fotografia são armazenados em discos rígidos locais seguros e na cloud (com acesso restrito) durante o processo de edição e como backup, sendo eliminados mediante pedido expresso do cliente após a conclusão do projeto.', 'We adopt appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration or destruction. Video and photography files are stored on secure local hard drives and in the cloud (with restricted access) during the editing process and as backup, being deleted upon the client\'s express request after the project is completed.'],
    ['>6. Os seus Direitos (RGPD)</h2>', '>6. Your Rights (GDPR)</h2>'],
    ['Nos termos do Regulamento Geral de Proteção de Dados, enquanto titular dos dados, tem o direito de:', 'Under the General Data Protection Regulation, as a data subject, you have the right to:'],
    ['<strong>Acesso:</strong> Solicitar uma cópia dos dados que temos sobre si.', '<strong>Access:</strong> Request a copy of the data we hold about you.'],
    ['<strong>Retificação:</strong> Pedir a correção de dados incorretos ou incompletos.', '<strong>Rectification:</strong> Request the correction of inaccurate or incomplete data.'],
    ['<strong>Apagamento ("Direito ao Esquecimento"):</strong> Solicitar que as suas informações e imagens sejam apagadas dos nossos registos.', '<strong>Erasure ("Right to be Forgotten"):</strong> Request that your information and images be deleted from our records.'],
    ['<strong>Portabilidade:</strong> Solicitar a transferência dos seus dados para si.', '<strong>Portability:</strong> Request the transfer of your data to you.'],
    ['<strong>Oposição / Retirada de consentimento:</strong> Dizer-nos para parar de usar os seus dados (ex: cancelar subscrição da newsletter).', '<strong>Objection / Withdrawal of consent:</strong> Tell us to stop using your data (e.g., unsubscribe from the newsletter).'],
    ['>7. Contacto</h2>', '>7. Contact</h2>'],
    ['Para exercer qualquer um destes direitos ou se tiver dúvidas sobre esta política, por favor contacte-nos através do e-mail: <strong>hello@moonbowmedia.pt</strong>.', 'To exercise any of these rights or if you have questions about this policy, please contact us via email: <strong>hello@moonbowmedia.pt</strong>.'],
];

// ======================================================================
// LINK REWIRING MAP — all internal PT links → EN links
// ======================================================================
const linkMap = [
    ['href="index.html"', 'href="index-en.html"'],
    ['href="index.html#services"', 'href="index-en.html#services"'],
    ['href="index.html#clients"', 'href="index-en.html#clients"'],
    ['href="index.html#testimonials"', 'href="index-en.html#testimonials"'],
    ['href="services.html"', 'href="services-en.html"'],
    ['href="process.html"', 'href="process-en.html"'],
    ['href="about.html"', 'href="about-en.html"'],
    ['href="contact.html"', 'href="contact-en.html"'],
    ['href="privacidade.html"', 'href="privacidade-en.html"'],
    ['href="termos.html"', 'href="termos-en.html"'],
    ['href="services.html#video"', 'href="services-en.html#video"'],
    ['href="services.html#broadcast"', 'href="services-en.html#broadcast"'],
    ['href="services.html#design"', 'href="services-en.html#design"'],
    ['href="contact.html#contactForm"', 'href="contact-en.html#contactForm"'],
];

// ======================================================================
// MAIN LOGIC
// ======================================================================
function run() {
    const ptFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('-en'));

    ptFiles.forEach(file => {
        const baseName = file.replace('.html', '');
        let ptHtml = fs.readFileSync(file, 'utf8');

        // ── 1) Fix the PT file's lang-switch so EN points to the EN page ──
        const langDivRe = /<div class="lang-switch">[\s\S]*?<\/div>/g;
        const ptSwitch = `<div class="lang-switch">
                          <a href="#" class="active">PT</a><span>|</span><a href="${baseName}-en.html">EN</a>
                      </div>`;
        ptHtml = ptHtml.replace(langDivRe, ptSwitch);
        fs.writeFileSync(file, ptHtml, 'utf8');

        // ── 2) Build EN page: start from the PT source ──
        let enHtml = ptHtml;

        // Apply all text translations
        translations.forEach(([pt, en]) => {
            // Use split/join for literal replacement (no regex escaping issues)
            enHtml = enHtml.split(pt).join(en);
        });

        // Rewrite internal links to point to EN pages
        linkMap.forEach(([pt, en]) => {
            enHtml = enHtml.split(pt).join(en);
        });

        // Fix the lang-switch so PT points back to the PT page and EN is active
        const enSwitch = `<div class="lang-switch">
                          <a href="${file}">PT</a><span>|</span><a href="#" class="active">EN</a>
                      </div>`;
        enHtml = enHtml.replace(langDivRe, enSwitch);

        fs.writeFileSync(`${baseName}-en.html`, enHtml, 'utf8');
        console.log(`✓ ${baseName}-en.html created (${(enHtml.length / 1024).toFixed(1)} KB)`);
    });

    console.log('\nDone — all EN pages generated and PT switchers wired.');
}

run();
