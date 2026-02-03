/* ================================================
   Dr Susan - Estética Avançada - Custom Scripts
   Abordagem conservadora
   ================================================ */

(function() {
  'use strict';

  // Aguardar página carregar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Aguardar React renderizar (aumentado para garantir)
    setTimeout(setupAll, 1500);
  }

  function setupAll() {
    fixHeaderStyles(); // Aplicar fixes primeiro
    setupNavbar();
    setupScrollAnimations();
    setupServiceCardsAnimations(); // Animações dos cards de serviços
    setupHeroContent(); // Conteúdo do hero
    setupSobreMimSection(); // Seção Sobre Mim
    setupWhatsAppIcon(); // Ícone do WhatsApp
    setupLanguageSwitcher(); // Sistema de tradução
    setupIntroSectionBackground(); // Background onda na seção introdução
    console.log('Dr Susan - Scripts carregados');
  }

  // ------------------------------------------------
  // FIX - Corrigir estilos do header via JS
  // ------------------------------------------------
  function fixHeaderStyles() {
    const header = document.querySelector('header');
    if (!header) return;

    // FIX 1: Remover fundo e borda do header
    header.style.cssText += `
      background: transparent !important;
      background-color: transparent !important;
      border: none !important;
      border-bottom: none !important;
    `;

    // FIX 2: Remover fundo da top bar (primeira div do header)
    const topBar = header.querySelector(':scope > div:first-child');
    if (topBar) {
      topBar.style.cssText += `
        background: transparent !important;
        background-color: transparent !important;
        background-image: none !important;
      `;
    }

    // FIX 3: Remover linha decorativa do logo (div com h-px)
    const logoLine = header.querySelector('.h-px, [class*="h-px"]');
    if (logoLine) {
      logoLine.style.display = 'none';
    }

    // Também buscar por posição absoluta -bottom
    header.querySelectorAll('div').forEach(div => {
      const classes = div.className || '';
      if (classes.includes('h-px') ||
          (classes.includes('absolute') && classes.includes('-bottom'))) {
        div.style.display = 'none';
      }
    });

    // FIX 4: Textos em branco para contraste
    header.querySelectorAll('*').forEach(el => {
      if (el.tagName !== 'INPUT') {
        el.style.color = '#fff';
      }
    });

    // FIX 5: SVGs em branco
    header.querySelectorAll('svg').forEach(svg => {
      svg.style.color = '#fff';
      svg.style.stroke = '#fff';
    });

    console.log('Header styles fixed');
  }

  // ------------------------------------------------
  // NAVBAR - Efeito de scroll
  // ------------------------------------------------
  function setupNavbar() {
    // Encontrar o primeiro header ou nav
    const nav = document.querySelector('header') || document.querySelector('nav');

    if (!nav) {
      console.log('Navbar não encontrada');
      return;
    }

    // Adicionar classe inicial
    nav.classList.add('dr-susan-nav-transparent');

    function onScroll() {
      if (window.scrollY > 50) {
        nav.classList.add('dr-susan-nav-scrolled');
      } else {
        nav.classList.remove('dr-susan-nav-scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Checar estado inicial
  }

  // ------------------------------------------------
  // ANIMAÇÕES DE SCROLL
  // ------------------------------------------------
  function setupScrollAnimations() {
    // Encontrar seções (exceto a primeira/hero)
    const sections = document.querySelectorAll('section');

    sections.forEach((section, index) => {
      // Pular primeira seção (hero)
      if (index === 0) return;

      section.classList.add('dr-susan-animate');

      // Adicionar delay baseado no índice
      const delayClass = `delay-${Math.min(index, 4)}`;
      section.classList.add(delayClass);
    });

    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observar elementos com a classe de animação
    document.querySelectorAll('.dr-susan-animate').forEach(el => {
      observer.observe(el);
    });
  }

  // ------------------------------------------------
  // HERO CONTENT - Texto centralizado no header
  // ------------------------------------------------
  function setupHeroContent() {
    // Verificar se já existe
    if (document.getElementById('hero-content-custom')) {
      return;
    }

    // Encontrar a primeira seção (hero)
    const heroSection = document.querySelector('main section:first-child') || document.querySelector('section[class*="h-screen"]');
    if (!heroSection) {
      console.log('[HERO] Seção hero não encontrada');
      return;
    }

    // Criar o conteúdo do hero
    const heroContent = document.createElement('div');
    heroContent.id = 'hero-content-custom';
    heroContent.innerHTML = `
      <h1 class="hero-title">Estética Avançada com Excelência Médica</h1>
      <p class="hero-subtitle">Resultados naturais. Tecnologia de ponta. Atendimento exclusivo.</p>
      <a href="https://wa.me/5511959263856" target="_blank" rel="noopener noreferrer" class="hero-btn">Quero essa experiência</a>
    `;

    // Inserir no hero
    heroSection.style.position = 'relative';
    heroSection.appendChild(heroContent);

    console.log('[HERO] Conteúdo inserido com sucesso');
  }

  // ------------------------------------------------
  // ANIMAÇÕES DOS CARDS DE SERVIÇOS
  // ------------------------------------------------
  function setupServiceCardsAnimations() {
    // Buscar TODAS as imagens do site
    const allImages = document.querySelectorAll('img');
    console.log('[ANIM] Total de imagens:', allImages.length);

    // URLs específicas das imagens dos cards de serviço
    const serviceImageUrls = [
      'kJd1JqN', // Estética Avançada
      '04ASIsT', // Cirurgias Corporais
      'pQnNmcH', // Ginecologia
      'OVdi22T', // Cirurgias Faciais
      'Jpq4U3B'  // Tecnologias
    ];

    let cardIndex = 0;

    allImages.forEach((img) => {
      const src = img.src || '';

      // Verificar se é uma das imagens de serviço
      const isServiceImage = serviceImageUrls.some(url => src.includes(url));
      if (!isServiceImage) return;

      console.log('[ANIM] Imagem de serviço encontrada:', src);

      // Subir na hierarquia para encontrar o grid
      let parent = img.parentElement;
      let grid = null;
      let attempts = 0;

      while (parent && attempts < 10) {
        if (parent.classList && parent.classList.contains('grid')) {
          grid = parent;
          break;
        }
        parent = parent.parentElement;
        attempts++;
      }

      if (!grid) {
        console.log('[ANIM] Grid não encontrado para:', src);
        return;
      }

      console.log('[ANIM] Grid encontrado, filhos:', grid.children.length);

      // Pegar os dois filhos do grid
      const children = Array.from(grid.children);
      if (children.length < 2) return;

      let imgCol = null;
      let textCol = null;

      children.forEach(child => {
        if (child.contains(img)) {
          imgCol = child;
        } else {
          textCol = child;
        }
      });

      if (!imgCol || !textCol) {
        console.log('[ANIM] Colunas não identificadas');
        return;
      }

      // Alternar direção
      const isOdd = cardIndex % 2 !== 0;

      console.log('[ANIM] Aplicando animação ao card', cardIndex, 'invertido:', isOdd);

      // Aplicar estilos de animação
      imgCol.style.cssText = `
        opacity: 0 !important;
        transform: translateX(${isOdd ? '80px' : '-80px'}) !important;
        transition: opacity 1s ease-out, transform 1s ease-out !important;
      `;

      textCol.style.cssText = `
        opacity: 0 !important;
        transform: translateX(${isOdd ? '-80px' : '80px'}) !important;
        transition: opacity 1s ease-out 0.15s, transform 1s ease-out 0.15s !important;
      `;

      // Data attribute para o observer
      imgCol.setAttribute('data-service-animate', cardIndex);
      textCol.setAttribute('data-service-animate', cardIndex);

      cardIndex++;
    });

    console.log('[ANIM] Total de cards configurados:', cardIndex);

    if (cardIndex === 0) {
      console.log('[ANIM] Nenhum card encontrado, tentando em 2s...');
      setTimeout(setupServiceCardsAnimations, 2000);
      return;
    }

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('[ANIM] Elemento visível, animando...');
          entry.target.style.cssText = `
            opacity: 1 !important;
            transform: translateX(0) !important;
            transition: opacity 1s ease-out, transform 1s ease-out !important;
          `;
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px'
    });

    // Observar todos os elementos marcados
    document.querySelectorAll('[data-service-animate]').forEach(el => {
      observer.observe(el);
    });

    console.log('[ANIM] Observer configurado');
  }

  // ------------------------------------------------
  // WHATSAPP ICON - Ícone oficial com Font Awesome
  // ------------------------------------------------
  function setupWhatsAppIcon() {
    // Função para esconder botões originais
    function hideOriginalButtons() {
      document.querySelectorAll('a').forEach(link => {
        const href = link.href || '';
        if ((href.includes('wa.me') || href.includes('whatsapp') || href.includes('api.whatsapp')) &&
            link.id !== 'whatsapp-btn-custom' &&
            !link.classList.contains('hero-btn')) {
          link.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; position: absolute !important; left: -9999px !important;';

          // Esconder todos os pais até o body
          let parent = link.parentElement;
          while (parent && parent !== document.body) {
            const style = getComputedStyle(parent);
            if (style.position === 'fixed' || parent.className.includes('fixed')) {
              parent.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; width: 0 !important; height: 0 !important; overflow: hidden !important;';
            }
            parent = parent.parentElement;
          }
        }
      });
    }

    // Esconder botões originais imediatamente
    hideOriginalButtons();

    // Verificar se já existe nosso botão customizado
    if (document.getElementById('whatsapp-btn-custom')) {
      return;
    }

    // URL do WhatsApp com o número correto
    const whatsappUrl = 'https://wa.me/5511959263856';

    // Criar novo botão do WhatsApp
    const newBtn = document.createElement('a');
    newBtn.id = 'whatsapp-btn-custom';
    newBtn.href = whatsappUrl;
    newBtn.target = '_blank';
    newBtn.rel = 'noopener noreferrer';
    newBtn.title = 'Fale conosco no WhatsApp';
    newBtn.innerHTML = '<i class="fa-brands fa-whatsapp" style="font-size: 28px; color: #fff;"></i>';
    newBtn.style.cssText = `
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 56px !important;
      height: 56px !important;
      background-color: #25D366 !important;
      border-radius: 50% !important;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4) !important;
      position: fixed !important;
      right: 40px !important;
      bottom: 24px !important;
      z-index: 99999 !important;
      transition: transform 0.3s ease, box-shadow 0.3s ease !important;
      text-decoration: none !important;
    `;

    // Hover effects
    newBtn.addEventListener('mouseenter', () => {
      newBtn.style.transform = 'scale(1.1)';
      newBtn.style.boxShadow = '0 6px 16px rgba(37, 211, 102, 0.5)';
    });
    newBtn.addEventListener('mouseleave', () => {
      newBtn.style.transform = 'scale(1)';
      newBtn.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)';
    });

    // Adicionar ao body
    document.body.appendChild(newBtn);
    console.log('[WHATSAPP] Novo botão criado:', whatsappUrl);

    // Observer para esconder botões que o React possa adicionar depois
    const observer = new MutationObserver(() => {
      hideOriginalButtons();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Também esconder periodicamente por segurança
    setInterval(hideOriginalButtons, 1000);
  }

  // ------------------------------------------------
  // SEÇÃO SOBRE MIM - Dra. Susan
  // ------------------------------------------------
  function setupSobreMimSection() {
    // Verificar se já existe
    if (document.getElementById('sobre-mim-section')) {
      console.log('[SOBRE MIM] Seção já existe');
      return;
    }

    // Encontrar a seção "Outras Formas de Trabalhar Comigo" para inserir antes
    const allSections = document.querySelectorAll('main section');
    let targetSection = null;

    allSections.forEach(section => {
      const text = section.textContent || '';
      if (text.includes('Outras Formas de Trabalhar Comigo') ||
          text.includes('Mentoria VIP') ||
          text.includes('Programa de Estágio')) {
        targetSection = section;
      }
    });

    if (!targetSection) {
      console.log('[SOBRE MIM] Seção alvo não encontrada');
      return;
    }

    // Criar a seção Sobre Mim
    const sobreMimSection = document.createElement('section');
    sobreMimSection.id = 'sobre-mim-section';
    sobreMimSection.innerHTML = `
      <div class="sobre-mim-container">
        <div class="sobre-mim-card">
          <div class="sobre-mim-foto dr-susan-slide-left">
            <img src="/assets/drsusan.png" alt="Dra. Susan - Cirurgiã Plástica" />
          </div>
          <div class="sobre-mim-conteudo dr-susan-slide-right">
            <h2 class="sobre-mim-titulo">Sobre Mim</h2>
            <h3 class="sobre-mim-nome">Dra. Susan</h3>
            <p class="sobre-mim-especialidade">Cirurgiã Plástica e Especialista em Estética Avançada</p>
            <p class="sobre-mim-crm">CRM/SP XXXXX | RQE XXXXX</p>
            <p class="sobre-mim-bio">
              Com anos de dedicação à medicina estética, minha missão é realçar a beleza natural de cada paciente através de uma abordagem conservadora e personalizada. Utilizo as tecnologias mais modernas do mercado, sempre priorizando a segurança, o bem-estar e resultados harmoniosos que elevam a autoestima e a confiança das minhas pacientes.
            </p>
            <ul class="sobre-mim-diferenciais">
              <li>Especialista em procedimentos minimamente invasivos</li>
              <li>Abordagem personalizada e humanizada</li>
              <li>Atualização constante em tecnologias de ponta</li>
            </ul>
            <a href="#contato" class="sobre-mim-btn">
              Conheça minha trajetória
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;

    // Inserir antes da seção alvo
    targetSection.parentNode.insertBefore(sobreMimSection, targetSection);
    console.log('[SOBRE MIM] Seção inserida com sucesso');

    // Configurar animação de entrada
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px'
      });

      const fotoEl = sobreMimSection.querySelector('.sobre-mim-foto');
      const conteudoEl = sobreMimSection.querySelector('.sobre-mim-conteudo');

      if (fotoEl) observer.observe(fotoEl);
      if (conteudoEl) observer.observe(conteudoEl);
    }, 100);
  }

  // ------------------------------------------------
  // SISTEMA DE TRADUÇÃO - PT/EN
  // ------------------------------------------------
  function setupLanguageSwitcher() {
    // Dicionário de traduções
    const translations = {
      // Menu de navegação
      'Estética Avançada': 'Advanced Aesthetics',
      'Cirurgias Corporais': 'Body Surgery',
      'Cirurgias Faciais': 'Facial Surgery',
      'Ginecologia': 'Gynecology',
      'Tecnologias': 'Technologies',
      'Clínicas': 'Clinics',
      'Antes e Depois': 'Before and After',
      'Buscar...': 'Search...',

      // Títulos principais
      'QUAL O SEU OBJETIVO?': 'WHAT IS YOUR GOAL?',
      'Harmonizar': 'Harmonize',
      'Prevenir': 'Prevent',
      'Rejuvenescer': 'Rejuvenate',
      'Performar': 'Perform',
      'Aperfeiçoar': 'Perfect',

      // Seção sobre
      'A Dr Susan Estética Avançada representa um novo padrão em cuidados de beleza, saúde e bem-estar. Unimos tecnologia de ponta, equipe altamente qualificada e uma abordagem personalizada que valoriza cada fase da sua jornada estética.': 'Dr Susan Advanced Aesthetics represents a new standard in beauty, health and wellness care. We combine cutting-edge technology, a highly qualified team and a personalized approach that values each phase of your aesthetic journey.',
      'Nosso compromisso vai além da aparência: buscamos oferecer experiências transformadoras, com conforto, segurança e resultados duradouros, em um ambiente sofisticado e acolhedor.': 'Our commitment goes beyond appearance: we seek to offer transformative experiences, with comfort, safety and lasting results, in a sophisticated and welcoming environment.',
      'Somos especialistas em cirurgias plásticas e procedimentos estéticos modernos, guiados pela excelência e pela constante inovação. Descubra como é sentir-se confiante, radiante e plenamente você.': 'We are specialists in plastic surgery and modern aesthetic procedures, guided by excellence and constant innovation. Discover what it feels like to be confident, radiant and fully yourself.',

      // Cards de serviço
      'Ginecologia Estética': 'Aesthetic Gynecology',
      'Ver todos os procedimentos': 'View all procedures',
      'outros procedimentos': 'other procedures',

      // Procedimentos - Estética Avançada
      'Bioestimulador de Colágeno Injetável': 'Injectable Collagen Biostimulator',
      'Depilação a Laser': 'Laser Hair Removal',
      'Endolift': 'Endolift',
      'Enzimas Lipolíticas': 'Lipolytic Enzymes',
      'Secagem de Vasos a Laser': 'Laser Vein Treatment',
      'Harmonização Facial': 'Facial Harmonization',
      'Rinoplastia sem cirurgia': 'Non-surgical Rhinoplasty',
      'Remoção de Tatuagem': 'Tattoo Removal',
      'Tratamentos Capilares': 'Hair Treatments',
      'Otoplastia Avançada': 'Advanced Otoplasty',
      'Protocolo de Rejuvenescimento': 'Rejuvenation Protocol',
      'Protocolo de Acne': 'Acne Protocol',
      'Protocolo de Manchas': 'Spots Protocol',
      'Protocolo de Glúteos': 'Buttocks Protocol',
      'Protocolo de Firmeza da Pele': 'Skin Firmness Protocol',
      'Toxina Botulínica': 'Botulinum Toxin',

      // Procedimentos - Cirurgias Corporais
      'Abdominoplastia Clássica': 'Classic Abdominoplasty',
      'Abdominoplastia Reversa': 'Reverse Abdominoplasty',
      'Braquioplastia Reversa': 'Reverse Brachioplasty',
      'Cruroplastia': 'Thigh Lift',
      'Correção de Cicatriz': 'Scar Correction',
      'Gluteoplastia': 'Gluteoplasty',
      'Ginecomastia': 'Gynecomastia',
      'Lipoaspiração Convencional': 'Conventional Liposuction',
      'LAD Avançada': 'Advanced LAD',
      'Lifting Glúteo': 'Buttock Lift',
      'Mastopexia': 'Mastopexy',
      'Mini Abdominoplastia': 'Mini Abdominoplasty',
      'Onfaloplastia': 'Umbilicoplasty',
      'Prótese Mamária': 'Breast Implants',
      'Torsoplastia': 'Torsoplasty',

      // Procedimentos - Ginecologia
      'Ninfoplastia': 'Labiaplasty',
      'Clareamento Íntimo': 'Intimate Whitening',
      'Clitoroplastia': 'Clitoroplasty',
      'Capuzplastia': 'Clitoral Hood Reduction',
      'Correção de Cistocele, Retocele e Perineoplastia': 'Cystocele, Rectocele and Perineoplasty Correction',
      'Himenoplastia': 'Hymenoplasty',
      'Métodos de Contracepção': 'Contraception Methods',
      'Labioplastia dos Grandes Lábios Vaginais': 'Labia Majora Labiaplasty',
      'Monalisa Touch': 'Monalisa Touch',
      'Perineoplastia': 'Perineoplasty',
      'Rejuvene Íntimo': 'Intimate Rejuvenation',
      'Retirada de Pilicoma Anal': 'Anal Skin Tag Removal',

      // Procedimentos - Cirurgias Faciais
      'Alectomia': 'Alar Base Reduction',
      'Bichectomia': 'Buccal Fat Removal',
      'Blefaroplastia': 'Blepharoplasty',
      'Brow Lift': 'Brow Lift',
      'Cervicoplastia': 'Neck Lift',
      'Facelift Deep Plane com Células-Tronco': 'Deep Plane Facelift with Stem Cells',
      'Frontoplastia': 'Forehead Lift',
      'Fox Eyes': 'Fox Eyes',
      'Lip Lift': 'Lip Lift',
      'Lipoaspiração Submandibular e Facial': 'Submental and Facial Liposuction',
      'Lobuloplastia': 'Earlobe Repair',
      'Mentoplastia com Prótese': 'Chin Implant',
      'Otoplastia': 'Otoplasty',
      'Rinoplastia (funcional e estética)': 'Rhinoplasty (functional and aesthetic)',

      // Tecnologias
      'Argoplasma': 'Argoplasma',
      'Cm Slim e Embody': 'Cm Slim and Embody',
      'Emsella': 'Emsella',
      'Laser CO2 Duoglide': 'CO2 Laser Duoglide',
      'Laser Etherea MX': 'Etherea MX Laser',
      'Laser Lavieen': 'Lavieen Laser',
      'Mesojectgun': 'Mesojectgun',
      'Morpheus': 'Morpheus',
      'Renuvion': 'Renuvion',
      'RedTouch Pro': 'RedTouch Pro',
      'Safer ou Vaser': 'Safer or Vaser',
      'Soprano Titanium': 'Soprano Titanium',
      'Ultraformer MPT': 'Ultraformer MPT',

      // Seção Experiências
      'Experiências que Transformam': 'Transformative Experiences',
      'Cada história é única, cada resultado é uma celebração da sua beleza natural': 'Each story is unique, each result is a celebration of your natural beauty',
      'Resultado impecável! A Dra. Susan tem um olhar único para realçar a beleza natural. Me sinto mais confiante e radiante.': 'Impeccable results! Dr. Susan has a unique eye for enhancing natural beauty. I feel more confident and radiant.',
      'Profissionalismo excepcional e resultado além das minhas expectativas. Ambiente acolhedor e tecnologia de ponta.': 'Exceptional professionalism and results beyond my expectations. Welcoming environment and cutting-edge technology.',
      'Experiência transformadora! Cada detalhe foi pensado para o meu bem-estar. Recomendo de olhos fechados.': 'Transformative experience! Every detail was designed for my well-being. I highly recommend it.',
      'Nossa Trajetória de Excelência': 'Our Journey of Excellence',
      'Equipe Especializada': 'Specialized Team',
      'Profissionais certificados e em constante atualização': 'Certified professionals in constant training',
      'Satisfação': 'Satisfaction',
      'Mais de 95% de aprovação entre nossas pacientes': 'Over 95% approval among our patients',
      'Anos de Experiência': 'Years of Experience',
      'Dedicação à estética e bem-estar feminino': 'Dedication to aesthetics and women\'s well-being',
      'Procedimentos Realizados': 'Procedures Performed',
      'Experiência comprovada em diversos tratamentos': 'Proven experience in various treatments',

      // Seção Outras Formas
      'Outras Formas de Trabalhar Comigo': 'Other Ways to Work With Me',
      'Além dos procedimentos estéticos, ofereço oportunidades únicas para quem deseja crescer profissionalmente na área da beleza e bem-estar': 'Beyond aesthetic procedures, I offer unique opportunities for those who want to grow professionally in the beauty and wellness field',
      'Mentoria VIP': 'VIP Mentorship',
      'Acompanhamento individual para alavancar sua carreira na estética.': 'Individual guidance to boost your career in aesthetics.',
      'Palestras': 'Lectures',
      'Palestras inspiradoras sobre beleza, autoestima e empreendedorismo feminino.': 'Inspiring lectures on beauty, self-esteem and female entrepreneurship.',
      'Programa de Estágio': 'Internship Program',
      'Participe do nosso programa e aprenda na prática com a nossa equipe.': 'Join our program and learn hands-on with our team.',
      'Cursos e Aulas': 'Courses and Classes',
      'Aprenda comigo através de cursos e treinamentos exclusivos.': 'Learn with me through exclusive courses and training.',
      'Saiba mais': 'Learn more',

      // Seção Contato
      'Vamos Conversar?': 'Let\'s Talk?',
      'Estamos aqui para esclarecer suas dúvidas, ajudar você a alcançar seus objetivos estéticos ou saber mais sobre nossas mentorias, palestras e programas especiais.': 'We are here to answer your questions, help you achieve your aesthetic goals or learn more about our mentorships, lectures and special programs.',
      'Agende sua Consulta': 'Schedule Your Appointment',
      'Preencha o formulário e nossa equipe entrará em contato em até 2 horas': 'Fill out the form and our team will contact you within 2 hours',
      'Nome Completo': 'Full Name',
      'Seu nome completo': 'Your full name',
      'Telefone': 'Phone',
      'E-mail': 'Email',
      'Motivo do Contato': 'Reason for Contact',
      'Selecione o motivo do seu contato': 'Select the reason for your contact',
      'Quero agendar um procedimento estético': 'I want to schedule an aesthetic procedure',
      'Quero ser sua aluna (programa de estágio)': 'I want to be your student (internship program)',
      'Quero fazer uma mentoria VIP': 'I want VIP mentorship',
      'Quero contratar uma palestra': 'I want to hire a lecture',
      'Tenho dúvidas gerais': 'I have general questions',
      'Mensagem': 'Message',
      'Conte-nos mais sobre seus objetivos e expectativas...': 'Tell us more about your goals and expectations...',
      'Enviar Mensagem': 'Send Message',
      'Mensagem Enviada!': 'Message Sent!',
      'Entraremos em contato em breve.': 'We will contact you soon.',

      // Informações de contato
      'Localização': 'Location',
      'Ver no mapa': 'View on map',
      'Ligar agora': 'Call now',
      'Enviar e-mail': 'Send email',
      'Horário de Funcionamento': 'Business Hours',
      'Segunda à Sexta: 8h às 19h': 'Monday to Friday: 8am to 7pm',
      'Sábado: 8h às 17h': 'Saturday: 8am to 5pm',
      'Domingo: Fechado': 'Sunday: Closed',
      'Agendar consulta': 'Schedule appointment',
      'Siga-nos nas Redes Sociais': 'Follow Us on Social Media',
      'Acompanhe nossos resultados e dicas de beleza': 'Follow our results and beauty tips',

      // Footer
      'Especialidades': 'Specialties',
      'Procedimentos Populares': 'Popular Procedures',
      'Contato': 'Contact',
      'Referência em estética e bem-estar, oferecendo tratamentos personalizados com tecnologia de ponta e cuidado humanizado.': 'Reference in aesthetics and wellness, offering personalized treatments with cutting-edge technology and humanized care.',
      'Certificação ANVISA': 'ANVISA Certification',
      'Clínica Certificada': 'Certified Clinic',
      'Receba Dicas de Beleza e Bem-estar': 'Receive Beauty and Wellness Tips',
      'Cadastre-se e receba conteúdos exclusivos sobre estética e cuidados pessoais': 'Sign up and receive exclusive content about aesthetics and personal care',
      'Seu melhor e-mail': 'Your best email',
      'Inscrever-se': 'Subscribe',
      'Todos os direitos reservados.': 'All rights reserved.',
      'Feito com carinho para você': 'Made with love for you',
      'Política de Privacidade': 'Privacy Policy',
      'Termos de Uso': 'Terms of Use',
      'Cookies': 'Cookies',

      // Tooltip WhatsApp
      'Fale conosco no WhatsApp': 'Chat with us on WhatsApp',

      // Logo
      'ESTÉTICA AVANÇADA': 'ADVANCED AESTHETICS',

      // Hero Content
      'Estética Avançada com Excelência Médica': 'Advanced Aesthetics with Medical Excellence',
      'Resultados naturais. Tecnologia de ponta. Atendimento exclusivo.': 'Natural results. Cutting-edge technology. Exclusive service.',
      'Quero essa experiência': 'I want this experience',

      // Seção Sobre Mim
      'Sobre Mim': 'About Me',
      'Dra. Susan': 'Dr. Susan',
      'Cirurgiã Plástica e Especialista em Estética Avançada': 'Plastic Surgeon and Advanced Aesthetics Specialist',
      'Com anos de dedicação à medicina estética, minha missão é realçar a beleza natural de cada paciente através de uma abordagem conservadora e personalizada. Utilizo as tecnologias mais modernas do mercado, sempre priorizando a segurança, o bem-estar e resultados harmoniosos que elevam a autoestima e a confiança das minhas pacientes.': 'With years of dedication to aesthetic medicine, my mission is to enhance the natural beauty of each patient through a conservative and personalized approach. I use the most modern technologies on the market, always prioritizing safety, well-being and harmonious results that elevate my patients\' self-esteem and confidence.',
      'Especialista em procedimentos minimamente invasivos': 'Specialist in minimally invasive procedures',
      'Abordagem personalizada e humanizada': 'Personalized and humanized approach',
      'Atualização constante em tecnologias de ponta': 'Constant updating in cutting-edge technologies',
      'Conheça minha trajetória': 'Learn about my journey'
    };

    let currentLang = 'pt';
    let originalTexts = new Map();

    // Função para salvar textos originais
    function saveOriginalTexts() {
      const textNodes = getTextNodes(document.body);
      textNodes.forEach(node => {
        if (!originalTexts.has(node)) {
          originalTexts.set(node, node.textContent);
        }
      });

      // Salvar placeholders
      document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
        if (!el.dataset.originalPlaceholder) {
          el.dataset.originalPlaceholder = el.placeholder;
        }
      });
    }

    // Função para obter todos os nós de texto
    function getTextNodes(element) {
      const textNodes = [];
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.textContent.trim().length > 0) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );

      while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
      }
      return textNodes;
    }

    // Função para traduzir
    function translateToEnglish() {
      saveOriginalTexts();

      originalTexts.forEach((originalText, node) => {
        const trimmed = originalText.trim();
        if (translations[trimmed]) {
          node.textContent = originalText.replace(trimmed, translations[trimmed]);
        }
      });

      // Traduzir placeholders
      document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
        const original = el.dataset.originalPlaceholder;
        if (translations[original]) {
          el.placeholder = translations[original];
        }
      });

      currentLang = 'en';
      console.log('Traduzido para Inglês');
    }

    // Função para voltar ao português
    function translateToPortuguese() {
      originalTexts.forEach((originalText, node) => {
        node.textContent = originalText;
      });

      // Restaurar placeholders
      document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
        if (el.dataset.originalPlaceholder) {
          el.placeholder = el.dataset.originalPlaceholder;
        }
      });

      currentLang = 'pt';
      console.log('Traduzido para Português');
    }

    // Encontrar os botões de bandeira
    function setupFlagButtons() {
      const buttons = document.querySelectorAll('button');

      buttons.forEach(button => {
        const text = button.textContent;

        // Botão da bandeira americana (US)
        if (text.includes('🇺🇸') || text.includes('US')) {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (currentLang !== 'en') {
              translateToEnglish();
            }
          });
        }

        // Botão da bandeira brasileira (BR)
        if (text.includes('🇧🇷') || text.includes('BR')) {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (currentLang !== 'pt') {
              translateToPortuguese();
            }
          });
        }
      });
    }

    // Inicializar
    saveOriginalTexts();
    setupFlagButtons();
    console.log('Sistema de tradução configurado');
  }

  // ------------------------------------------------
  // BACKGROUND ONDA - Seção de introdução
  // ------------------------------------------------
  function setupIntroSectionBackground() {
    // Buscar a seção que contém o texto específico
    const allSections = document.querySelectorAll('main section');
    let targetSection = null;

    allSections.forEach(section => {
      const text = section.textContent || '';
      if (text.includes('A Dr Susan Estética Avançada representa um novo padrão') ||
          text.includes('Dr Susan Advanced Aesthetics represents a new standard')) {
        targetSection = section;
      }
    });

    if (!targetSection) {
      console.log('[ONDA] Seção de introdução não encontrada');
      return;
    }

    // Verificar se já foi aplicado
    if (targetSection.id === 'intro-section-onda') {
      return;
    }

    // Aplicar o ID para o CSS
    targetSection.id = 'intro-section-onda';
    console.log('[ONDA] Background aplicado na seção de introdução');
  }

})();
