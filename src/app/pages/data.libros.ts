export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  portada: string;
}

export const LIBROS_DATA: Libro[] = [
  { id: 1, titulo: 'El Juego de Ender', autor: 'Orson Scott Card', portada: 'https://www.penguinlibros.com/pe/2245708-thickbox_default/el-juego-de-ender-saga-de-ender-1.jpg' },
  { id: 2, titulo: 'Harry Potter y la Piedra Filosofal', autor: 'J.K. Rowling', portada: 'https://www.penguinlibros.com/pe/1718475/harry-potter-y-la-piedra-filosofal-harry-potter-1.jpg' },
  { id: 3, titulo: 'Percy Jackson: El Ladrón del Rayo', autor: 'Rick Riordan', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqI75osp8TGp5Zv_opPf8Vg-89SUF3qjGhUA&s' },
  { id: 4, titulo: 'Naruto Vol. 1', autor: 'Masashi Kishimoto', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO26UakHlmrWjmQivRokbWu0XaHG12LrQNRw&s' },
  { id: 5, titulo: 'One Piece Vol. 3', autor: 'Eiichiro Oda', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZLcpiN8Yc3YaonMwSkw8OAGUXrGzUIs15w&s' },
  { id: 6, titulo: 'Dune', autor: 'Frank Herbert', portada: 'https://images.cdn2.buscalibre.com/fit-in/360x360/50/a6/50a6be83ca56322a70e2d07c4bcfed3e.jpg' }
];
