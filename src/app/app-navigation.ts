export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text: 'Configurações',
    icon: 'folder',
    isAdmin: false,
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
        path: '/pages/kanban/boards/boards',
      },
      {
        text: 'Relatorios',
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
  },
];
