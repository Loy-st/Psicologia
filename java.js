// 1. ROLAGEM SUAVE (Unificada)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const offsetPosition = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 2. CONFIGURAÇÃO DO WHATSAPP (Botão de Contato)
const btnContato = document.querySelector('.btn-primary');
if (btnContato) {
    btnContato.addEventListener('click', (e) => {
        // Se o botão for apenas para o WhatsApp e não para rolar a página:
        const mensagem = encodeURIComponent("Olá, gostaria de agendar uma consulta psicológica.");
        window.open(`https://wa.me/5561982856791?text=${mensagem}`, '_blank');
    });
}

// 3. ANIMAÇÃO DE REVELAÇÃO (Intersection Observer - Unificado)
const revealOptions = { threshold: 0.15 };
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // revealObserver.unobserve(entry.target); // Opcional: anima apenas uma vez
        }
    });
}, revealOptions);

document.querySelectorAll('.reveal, .s-card, .info-card, .about-text, .about-image').forEach(el => {
    el.classList.add('reveal'); 
    revealObserver.observe(el);
});

// 4. NAVBAR E BOTÃO VOLTAR AO TOPO
const header = document.querySelector('.navbar');
const backToTopButton = document.getElementById("backToTop");

window.addEventListener('scroll', () => {
    // Efeito Navbar
    if (window.scrollY > 50) {
        header.style.padding = "10px 8%";
        header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
    } else {
        header.style.padding = "15px 8%";
        header.style.boxShadow = "0 2px 15px rgba(0,0,0,0.05)";
    }

    // Botão Voltar ao Topo
    if (backToTopButton) {
        if (window.scrollY > 400) {
            backToTopButton.style.opacity = "1";
            backToTopButton.style.pointerEvents = "auto";
        } else {
            backToTopButton.style.opacity = "0";
            backToTopButton.style.pointerEvents = "none";
        }
    }
});

// 5. DEPOIMENTOS (Lógica de renderização mantida)
const depoimentos = [
    {
        nome: "Manuella Ervilha",
        avaliacoes: 3,
        tempo: "10 meses atrás",
        foto: "https://via.placeholder.com/40",
        texto: "Consultei com a Patrícia por quase um ano. Nesse ano ela me auxiliou a lidar com minhas questões de uma maneira incrível..."
    },
    {
        nome: "Pollyanna Olivato",
        avaliacoes: 6,
        tempo: "9 meses atrás",
        foto: "https://via.placeholder.com/40",
        texto: "Uma psicóloga muito querida. Atenciosa, leve e sempre tenta ajudar..."
    }
];

const container = document.querySelector('.testimonials-container');

function renderizarDepoimentos() {
    if (!container) return;
    container.innerHTML = depoimentos.map(dep => {
        const limite = 100;
        const textoCurto = dep.texto.length > limite ? dep.texto.substring(0, limite) + "..." : dep.texto;
        const temMais = dep.texto.length > limite;

        return `
            <div class="testimonial-card reveal">
                <div class="card-header">
                    <img src="${dep.foto}" alt="${dep.nome}" class="avatar">
                    <div class="user-info">
                        <span class="name">${dep.nome}</span>
                        <span class="reviews-count">${dep.avaliacoes} avaliações</span>
                    </div>
                </div>
                <div class="rating">
                    <span class="stars">★★★★★</span>
                    <span class="date">${dep.tempo}</span>
                </div>
                <p class="text">
                    <span class="conteudo-texto">${textoCurto}</span>
                    ${temMais ? `<button class="btn-read-more" onclick="expandirTexto(this, '${dep.texto.replace(/'/g, "\\'")}')">Mais</button>` : ''}
                </p>
            </div>
        `;
    }).join('');
    
    // Observa os novos cards renderizados para animação
    document.querySelectorAll('.testimonial-card').forEach(card => revealObserver.observe(card));
}

function expandirTexto(botao, textoCompleto) {
    const p = botao.parentElement;
    p.innerHTML = textoCompleto;
}

renderizarDepoimentos();

if (backToTopButton) {
    backToTopButton.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
}