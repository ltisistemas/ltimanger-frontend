export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home',
    isCompanyUser: true,
  },
  {
    text: 'Configurações',
    icon: 'folder',
    isAdmin: false,
    isCompanyUser: true,
    items: [
      {
        text: 'Usuários',
        path: '/pages/admin/empresa-usuarios',
      }
    ]
  },
  {
    text: 'Projetos',
    icon: 'folder',
    items: [
      {
        text: 'Quadros',
        path: 'quadros'
      },
      {
        text: 'Relatorios',
        isCompanyUser: true,
      }
    ]
  },
  {
    text: 'Administração',
    icon: 'folder',
    isAdmin: true,
    items: [
      {
        text: 'Empresas',
        path: '/pages/admin/empresas',
      }
    ]
  }
];
