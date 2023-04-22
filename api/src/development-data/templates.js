const courseTypes = [
    {
        name: 'Fundamentals 1.0',
        title: 'Software Development desde cero',
        title_extra: '(Javascript&Node)',
        type: 'Fundamentos',
        duration: '3 meses',
        status: 'open',
        level: 1,
        technologies: 'JavaScript y Lógica de Programación, React & Node.',
        price: 'Gratis.',
        minimum: 60,
        extra_alert: false
    },
    {
        name: 'Fullstack 1.0',
        title: 'Full Stack Bootcamp',
        title_extra: '(React&Node)',
        type: 'Especialización',
        duration: '2 meses',
        status: 'open',
        level: 2,
        technologies: 'JReact, Redux, Node, SQL, Docker & Kubernetes.',
        price: 'Solo pagas si obtienes un empleo.',
        minimum: 60,
        extra_alert: false
    }
];

module.exports = courseTypes;
