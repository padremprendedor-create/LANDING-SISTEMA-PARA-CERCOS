/* ============================================
   LANDING CERCOS PERIMÉTRICOS - JAVASCRIPT
   ============================================ */

/* === Supabase Configuration === */
const SUPABASE_URL = 'https://gnigvzyzwqhukgabwpey.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduaWd2enl6d3FodWtnYWJ3cGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1OTE1MDMsImV4cCI6MjA4NjE2NzUwM30.PmGLT7X60VOdRxz0sqG1NJsrQ2PkBb0HiRZZuYP1K4A';

// Initialize Supabase client (with error handling)
let supabase = null;
try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase initialized successfully');
    } else {
        console.warn('⚠️ Supabase SDK not loaded, database features will be disabled');
    }
} catch (err) {
    console.warn('⚠️ Error initializing Supabase:', err);
}

/* === Save Lead to Supabase === */
async function saveLeadToSupabase(formData) {
    // Check if Supabase is available
    if (!supabase) {
        console.warn('⚠️ Supabase not available, skipping database save');
        return { success: false, error: 'Supabase not initialized' };
    }

    try {
        const { data, error } = await supabase
            .from('leads')
            .insert([{
                nombre: formData.nombre,
                empresa: formData.empresa,
                telefono: formData.whatsapp,
                rol: formData.rol,
                nicho: formData.nicho,
                empleados: formData.empleados,
                fuente_prospectos: formData.fuente_prospectos,
                dolor: formData.dolor,
                frustracion: formData.frustracion,
                inversion: formData.inversion,
                dispuesto_invertir: formData.dispuesto_invertir,
                plazo: formData.plazo,
                acepta_requisito: formData.acepta_requisito,
                decision_rapida: formData.decision_rapida,
                status: 'nuevo',
                source: 'landing_page',
                qualified: true
            }])
            .select();

        if (error) {
            console.error('Error saving lead to Supabase:', error);
            return { success: false, error };
        }

        console.log('Lead saved successfully:', data);
        return { success: true, data };
    } catch (err) {
        console.error('Exception saving lead:', err);
        return { success: false, error: err };
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initSmoothScroll();
    initScrollAnimations();
    initPhoneAnimation();
    initQualificationModal();
});

/* === Smooth Scroll para CTAs === */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 20;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* === Animaciones de Scroll (Intersection Observer) === */
function initScrollAnimations() {
    // Add animation classes to elements
    const animatedElements = [
        '.dolor-card',
        '.paso-card',
        '.oferta-card',
        '.confianza-item',
        '.quote',
        '.garantia-box',
        '.escasez-box',
        '.video-container',
        '.demo-container',
        '.qualification-cta'
    ];

    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            // Add stagger class for grid items
            if (index < 5) {
                el.classList.add(`stagger-${index + 1}`);
            }
        });
    });

    // Create Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/* === Phone Animation Enhancement === */
function initPhoneAnimation() {
    const phoneMockup = document.querySelector('.phone-mockup');

    if (!phoneMockup) return;

    // Add parallax effect on mouse move (desktop only)
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;

            phoneMockup.style.transform = `
                translateY(${-y}px) 
                rotateY(${x}deg) 
                rotateX(${-y}deg)
            `;
        });
    }
}

/* ============================================
   QUALIFICATION MODAL
   ============================================ */
function initQualificationModal() {
    const modal = document.getElementById('qualification-modal');
    const openBtn = document.getElementById('open-qualification-modal');
    const closeBtn = modal?.querySelector('.modal-close');
    const form = document.getElementById('qualification-form');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnSubmit = document.getElementById('btn-submit');
    const progressFill = document.getElementById('progress-fill');
    const currentStepSpan = document.getElementById('current-step');

    if (!modal || !openBtn) return;

    const TOTAL_STEPS = 7;
    let currentStep = 1;

    // Open modal
    openBtn.addEventListener('click', openModal);

    // Also open modal from CTA buttons with #formulario
    document.querySelectorAll('a[href="#formulario"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    // Close modal
    closeBtn?.addEventListener('click', closeModal);
    document.getElementById('close-disqualified')?.addEventListener('click', closeModal);
    document.getElementById('finish-qualification')?.addEventListener('click', closeModal);

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Navigation buttons
    btnPrev?.addEventListener('click', prevStep);
    btnNext?.addEventListener('click', nextStep);

    // Form submission
    form?.addEventListener('submit', handleFormSubmit);

    function openModal() {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        resetForm();
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function resetForm() {
        currentStep = 1;
        form?.reset();
        showStep(currentStep);
        updateProgress();
        updateNavButtons();

        // Hide special steps
        document.querySelector('[data-step="disqualified"]')?.classList.remove('active');
        document.querySelector('[data-step="success"]')?.classList.remove('active');
    }

    function showStep(step) {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(s => {
            s.classList.remove('active');
        });

        // Show current step
        const currentStepEl = document.querySelector(`[data-step="${step}"]`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
        }
    }

    function updateProgress() {
        const progress = (currentStep / TOTAL_STEPS) * 100;
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        if (currentStepSpan) {
            currentStepSpan.textContent = currentStep;
        }
    }

    function updateNavButtons() {
        if (btnPrev) {
            btnPrev.disabled = currentStep === 1;
        }

        if (currentStep === TOTAL_STEPS) {
            if (btnNext) btnNext.style.display = 'none';
            if (btnSubmit) btnSubmit.style.display = 'inline-flex';
        } else {
            if (btnNext) btnNext.style.display = 'inline-flex';
            if (btnSubmit) btnSubmit.style.display = 'none';
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
            updateProgress();
            updateNavButtons();
        }
    }

    function nextStep() {
        // Validate current step
        if (!validateCurrentStep()) {
            return;
        }

        // Check for disqualification
        const disqualifyResult = checkDisqualification();
        if (disqualifyResult.disqualified) {
            showDisqualified(disqualifyResult.message);
            return;
        }

        if (currentStep < TOTAL_STEPS) {
            currentStep++;
            showStep(currentStep);
            updateProgress();
            updateNavButtons();
        }
    }

    function validateCurrentStep() {
        const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
        if (!currentStepEl) return true;

        const inputs = currentStepEl.querySelectorAll('input[required], textarea[required], select[required]');
        let valid = true;

        inputs.forEach(input => {
            if (input.type === 'radio') {
                const radioGroup = currentStepEl.querySelectorAll(`input[name="${input.name}"]`);
                const checked = Array.from(radioGroup).some(r => r.checked);
                if (!checked) {
                    valid = false;
                    highlightError(radioGroup[0].closest('.form-group'));
                }
            } else if (input.type === 'checkbox') {
                // For checkbox groups, at least one should be checked (only if required)
                const checkboxGroup = currentStepEl.querySelectorAll(`input[name="${input.name}"]`);
                const checked = Array.from(checkboxGroup).some(c => c.checked);
                if (!checked && input.hasAttribute('required')) {
                    valid = false;
                    highlightError(input.closest('.form-group'));
                }
            } else {
                if (!input.value.trim()) {
                    valid = false;
                    highlightError(input.closest('.form-group'));
                }
            }
        });

        if (!valid) {
            showStepError('Por favor completa todos los campos requeridos');
        }

        return valid;
    }

    function highlightError(formGroup) {
        if (!formGroup) return;
        formGroup.classList.add('error');
        setTimeout(() => {
            formGroup.classList.remove('error');
        }, 3000);
    }

    function showStepError(message) {
        // Remove existing errors
        const existingError = document.querySelector('.step-error');
        if (existingError) existingError.remove();

        const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
        if (!currentStepEl) return;

        const errorDiv = document.createElement('div');
        errorDiv.className = 'step-error';
        errorDiv.style.cssText = `
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.5);
            border-radius: 8px;
            padding: 12px 16px;
            margin-bottom: 16px;
            color: #EF4444;
            font-size: 0.9rem;
        `;
        errorDiv.textContent = '⚠️ ' + message;

        currentStepEl.insertBefore(errorDiv, currentStepEl.firstChild);

        setTimeout(() => {
            errorDiv.remove();
        }, 4000);
    }

    function checkDisqualification() {
        // Check for hard disqualify options
        const disqualifyInputs = document.querySelectorAll('input[data-disqualify="hard"]:checked');

        for (const input of disqualifyInputs) {
            const fieldName = input.name;
            const value = input.value;

            let message = 'Basado en tus respuestas, actualmente no calificas para este sistema.';

            if (fieldName === 'nicho' && value === 'No') {
                message = 'Este sistema está diseñado exclusivamente para empresas de cercos perimétricos. No podemos ayudarte en este momento.';
            } else if (fieldName === 'dispuesto_invertir' && value === 'No') {
                message = 'Nuestro sistema requiere disposición a invertir para escalar. No es el momento adecuado para ti.';
            } else if (fieldName === 'plazo' && value === 'Solo estoy investigando') {
                message = 'Trabajamos solo con empresas listas para actuar. Vuelve cuando estés listo para implementar.';
            } else if (fieldName === 'acepta_requisito' && value === 'No') {
                message = 'La inversión en Meta Ads es un requisito para activar la garantía del sistema.';
            }

            return { disqualified: true, message };
        }

        return { disqualified: false };
    }

    function showDisqualified(message) {
        // Hide navigation
        document.querySelector('.modal-footer')?.style.setProperty('display', 'none');
        document.querySelector('.modal-header')?.style.setProperty('display', 'none');

        // Update message
        const msgEl = document.getElementById('disqualify-message');
        if (msgEl) msgEl.textContent = message;

        // Show disqualified step
        document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
        document.querySelector('[data-step="disqualified"]')?.classList.add('active');
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        // Validate last step
        if (!validateCurrentStep()) return;

        // Check final disqualification
        const disqualifyResult = checkDisqualification();
        if (disqualifyResult.disqualified) {
            showDisqualified(disqualifyResult.message);
            return;
        }

        // Collect all form data
        const formData = collectFormData();

        // Show loading state
        if (btnSubmit) {
            btnSubmit.innerHTML = '⏳ Guardando...';
            btnSubmit.disabled = true;
        }

        // Save to Supabase first (don't block WhatsApp if it fails)
        try {
            const result = await saveLeadToSupabase(formData);
            if (result.success) {
                console.log('✅ Lead guardado en Supabase');
            } else {
                console.warn('⚠️ Error guardando en Supabase, continuando con WhatsApp...');
            }
        } catch (err) {
            console.warn('⚠️ Error de conexión con Supabase:', err);
        }

        // Create WhatsApp message with all data
        const message = createQualificationMessage(formData);

        // Phone number for WhatsApp
        const phoneNumber = '51948105157'; // Replace with actual number
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Hide navigation
        document.querySelector('.modal-footer')?.style.setProperty('display', 'none');
        document.querySelector('.modal-header')?.style.setProperty('display', 'none');

        // Show success step
        document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
        document.querySelector('[data-step="success"]')?.classList.add('active');

        // Open WhatsApp after brief delay
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1500);
    }

    function collectFormData() {
        const data = {};

        // Text inputs
        data.nombre = document.getElementById('q-nombre')?.value.trim() || '';
        data.empresa = document.getElementById('q-empresa')?.value.trim() || '';
        data.whatsapp = document.getElementById('q-whatsapp')?.value.trim() || '';
        data.frustracion = document.getElementById('q-frustracion')?.value.trim() || '';

        // Radio buttons
        data.rol = document.querySelector('input[name="rol"]:checked')?.value || '';
        data.nicho = document.querySelector('input[name="nicho"]:checked')?.value || '';
        data.empleados = document.querySelector('input[name="empleados"]:checked')?.value || '';
        data.fuente_prospectos = document.querySelector('input[name="fuente_prospectos"]:checked')?.value || '';
        data.inversion = document.querySelector('input[name="inversion"]:checked')?.value || '';
        data.dispuesto_invertir = document.querySelector('input[name="dispuesto_invertir"]:checked')?.value || '';
        data.plazo = document.querySelector('input[name="plazo"]:checked')?.value || '';
        data.acepta_requisito = document.querySelector('input[name="acepta_requisito"]:checked')?.value || '';
        data.decision_rapida = document.querySelector('input[name="decision_rapida"]:checked')?.value || '';

        // Checkboxes (dolor)
        const dolorChecked = document.querySelectorAll('input[name="dolor[]"]:checked');
        data.dolor = Array.from(dolorChecked).map(c => c.value);

        return data;
    }

    function createQualificationMessage(data) {
        const dolorList = data.dolor.length > 0 ? data.dolor.join(', ') : 'No especificado';

        return `🔔 *NUEVA SOLICITUD DE AUDITORÍA - FORMULARIO COMPLETO*

📋 *DATOS BÁSICOS*
👤 Nombre: ${data.nombre}
🏢 Empresa: ${data.empresa}
📱 WhatsApp: ${data.whatsapp}
🎯 Rol: ${data.rol}

🎯 *CONFIRMACIÓN DE NICHO*
¿Se dedica a cercos perimétricos?: ${data.nicho}

📊 *VOLUMEN DEL NEGOCIO*
👥 Empleados: ${data.empleados}
📣 Fuente de prospectos: ${data.fuente_prospectos}

😤 *DOLOR REAL*
Problemas con leads: ${dolorList}
Frustración: "${data.frustracion}"

💰 *CAPACIDAD DE INVERSIÓN*
Inversión actual en Ads: ${data.inversion}
¿Dispuesto a invertir?: ${data.dispuesto_invertir}

⏰ *URGENCIA*
Plazo para solucionar: ${data.plazo}
¿Acepta requisito Meta Ads?: ${data.acepta_requisito}

✅ *CONFIRMACIÓN FINAL*
¿Decisiones rápidas?: ${data.decision_rapida}

---
Solicito una auditoría gratuita para el sistema de IA para cercos perimétricos.`;
    }
}

/* === Video Placeholder Click Handler === */
document.addEventListener('DOMContentLoaded', function () {
    const videoPlaceholder = document.querySelector('.video-placeholder');

    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function () {
            // Replace with actual video embed when ready
            // For now, open the modal
            const openBtn = document.getElementById('open-qualification-modal');
            if (openBtn) openBtn.click();
        });
    }
});

/* === Demo Button Handler === */
document.addEventListener('DOMContentLoaded', function () {
    const demoButton = document.querySelector('.demo-button');

    if (demoButton) {
        demoButton.addEventListener('click', function (e) {
            e.preventDefault();

            // Replace with actual WhatsApp demo link
            const demoPhone = '51948105157';
            const demoMessage = 'Hola, quiero probar el sistema de cotización automática para cercos.';
            const whatsappUrl = `https://wa.me/${demoPhone}?text=${encodeURIComponent(demoMessage)}`;

            window.open(whatsappUrl, '_blank');
        });
    }
});

/* === Utility: Throttle function === */
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
