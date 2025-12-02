import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  textoBusqueda: string = '';
  resultadosBusqueda: any[] = [];

  get todosLosLibros() {
    return [
      ...this.librosRecomendados,
      ...this.novedades,
      ...this.librosJuveniles,
      ...this.mundoLector,
      ...this.comicsMangas,
      ...this.ficcion,
      ...this.librosIngles,
      ...this.librosInfantiles,
      ...this.librosNoFiccion
    ];
  }

  buscarLibros() {
    const texto = this.textoBusqueda.toLowerCase().trim();

    if (texto === '') {
      this.resultadosBusqueda = [];
      return;
    }

    this.resultadosBusqueda = this.todosLosLibros.filter(libro =>
      libro.titulo.toLowerCase().includes(texto)
    );
  }
  slidesHero = [
    { imagen: 'https://i1.wp.com/www.smashasu.com/wp-content/uploads/2021/04/portada-2021-04-23t183600.960.png?resize=1024%2C535', titulo: 'Tu Mundo de Lectura', subtitulo: 'Explora miles de títulos, recursos educativos y contenido premium.' },
    { imagen: 'https://talkidiomes.com/wp-content/uploads/2024/07/057df9_4b55131b27f244a4aef639ce92f9728dmv2.png-910x675.webp', titulo: 'Descubre Nuevos Horizontes', subtitulo: 'Miles de libros y recursos para expandir tu conocimiento.' },
    { imagen: 'https://blogpolitours.wordpress.com/wp-content/uploads/2014/10/libro-de-viajes.jpg', titulo: 'Lee Donde Quieras', subtitulo: 'Accede a tu biblioteca desde cualquier dispositivo.' },
    { imagen: 'https://imagenes.heraldo.es/files/image_990_556/uploads/imagenes/2019/06/23/el-verano-es-un-momento-ideal-para-iniciarse-en-la-lectura.jpeg', titulo: 'Tu Lectura, Tu Estilo', subtitulo: 'Encuentra libros que se adapten a tus gustos y preferencias.' },
    { imagen: 'https://www.planetadelibros.com/usuaris/blog_entrada/miniatura/thumbs/946f54bc-8916-482b-953f-44e15b27cfae/d_510_306_crop/d9a242f0-577a-4d5f-ace7-9843570531b8-510x306-nov-febr-25.webp', titulo: 'Novedades Mensuales', subtitulo: 'Mantente actualizado con los últimos lanzamientos.' },
    { imagen: 'https://windumanoth.com/wp-content/uploads/2024/01/Novedades-Enero-Windumanoth.png', titulo: 'Ofertas Especiales', subtitulo: 'Aprovecha descuentos y promociones exclusivas.' }
  ];

  categorias = [
    { titulo: 'Fantasía', imagen: 'assets/imag/fantasia.jpg' },
    { titulo: 'Romance', imagen: 'assets/imag/romance.jpg' },
    { titulo: 'Misterio', imagen: 'assets/imag/misterio.jpg' },
    { titulo: 'Ciencia Ficción', imagen: 'assets/imag/cienciaficcion.jpg' },
    { titulo: 'Mangas', imagen: 'assets/imag/mangas.jpg' }
  ];

  librosRecomendados = [
    { titulo: 'Dune', autor: 'Frank Herbert', portada: 'https://images.cdn3.buscalibre.com/fit-in/360x360/f4/65/f465a84545d7a6f4109ae2922be1befa.jpg'},
    { titulo: 'Tokyo Ghoul', autor: 'Sui Ishida', portada: 'https://images.cdn3.buscalibre.com/fit-in/360x360/59/42/59427b708e8938fd44e18c6b211e6602.jpg' },
    { titulo: 'Hábitos Atómicos', autor: 'James Clear', portada: 'https://www.planetadelibros.com.pe/usuaris/libros/fotos/415/original/portada_habitos-atomicos_james-clear_202412171754.jpg' },
    { titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry', portada: 'https://portallibros.com/wp-content/uploads/2021/02/El-principito.jpg' }
  ];

  novedades = [
    { titulo: 'El Juego de Ender', portada: 'https://www.penguinlibros.com/pe/2245708-thickbox_default/el-juego-de-ender-saga-de-ender-1.jpg'},
    { titulo: 'La Sombra del Viento', portada: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1455148533i/29066187.jpg' },
    { titulo: 'Ready Player One', portada: 'https://www.fundaciobit.org/wp-content/uploads/2020/04/portada-ready-200x300.jpg' },
    { titulo: 'La Historia Interminable', portada: 'https://images.cdn1.buscalibre.com/fit-in/360x360/5b/18/5b18ed831bc8fbbac844f6a7bc5f9a51.jpg' },
    { titulo: '1984', portada: 'https://imgv2-2-f.scribdassets.com/img/word_document/603486960/original/0468b5a5b9/1?v=1' },
    { titulo: 'El Hobbit', portada: 'https://m.media-amazon.com/images/I/71qpt1yWfbL._AC_UF1000,1000_QL80_.jpg' }
  ];

  librosJuveniles = [
    { titulo: 'Percy Jackson', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQupLKhAQP3y0pg856Y7ZcAL4w4nEuaVdmxGw&s' },
    { titulo: 'Cazadores de Sombras', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgu7gcbrB2LEu9dN8CovB2qvbCKCd4TVUONQ&s' },
    { titulo: 'Maze Runner', portada: 'https://assets.lectulandia.com/b/ab/James%20Dashner/Maze%20Runner%20Prueba%20de%20fuego%20(10)/big.jpg' },
    { titulo: 'Wonder', portada: 'https://covers.storytel.com/jpg-640/9788809984684.c2468e0b-a716-4882-b76e-b50868c4de9c?optimize=high&quality=70&width=600' },
    { titulo: 'Artemis Fowl', portada: 'https://images.cdn1.buscalibre.com/fit-in/360x360/a8/38/a83860a197b76715f690e124572408a3.jpg' },
    { titulo: 'Eragon', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF7U51ZYmTSDSH7AJdgwSI-MSlJ4JD2ofV0A&s' }
  ];

  mundoLector = [
    { titulo: 'Libros Clásicos', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRllU39-4JtTC6G0RZcWQcMUM0ffTQDwbzS7A&s' },
    { titulo: 'Novelas Modernas', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt2AhZ1LgRqk5sP41YMuv4W9DfK32TX_lBOg&s' },
    { titulo: 'Literatura Infantil', portada: 'https://camp.ucss.edu.pe/wp-content/uploads/2025/03/world-book-day-vector-edited.jpg' },
    { titulo: 'Cómics', portada: 'https://i.blogs.es/fded1e/erik-mclean-27kcu7bxgei-unsplash/500_333.webp' },
    { titulo: 'Mangas', portada: 'https://googiehost.com/blog/wp-content/uploads/2023/09/Best-Free-Manga-Websites.webp' },
    { titulo: 'Ficción Científica', portada: 'https://i.ytimg.com/vi/I1mdT_CqHlQ/sddefault.jpg?v=614d06c4' }
  ];

  comicsMangas = [
    { titulo: 'Naruto', portada: 'https://m.media-amazon.com/images/M/MV5BZTNjOWI0ZTAtOGY1OS00ZGU0LWEyOWYtMjhkYjdlYmVjMDk2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
    { titulo: 'One Piece', portada: 'https://m.media-amazon.com/images/S/pv-target-images/a0cb3885c44b8305ac89ba7ce98e8cd978bf3ebba6a151a00dbf2d528e98bf3b.jpg' },
    { titulo: 'Dragon Ball', portada: 'https://m.media-amazon.com/images/S/pv-target-images/334f00b53cf3ef848ea7048b25711bc98e8236ce1685a096990c80d0965835ea.png' },
    { titulo: 'Attack on Titan', portada: 'https://m.media-amazon.com/images/M/MV5BZjliODY5MzQtMmViZC00MTZmLWFhMWMtMjMwM2I3OGY1MTRiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
    { titulo: 'Tokyo Revengers', portada: 'https://images.cdn1.buscalibre.com/fit-in/360x360/ad/7e/ad7ea6d0d81ddf0dc323f05afbe00788.jpg' },
    { titulo: 'My Hero Academia', portada: 'https://images.justwatch.com/poster/228096352/s332/temporada-1' }
  ];

  ficcion = [
    { titulo: 'Dune', portada: 'https://images.cdn3.buscalibre.com/fit-in/360x360/f4/65/f465a84545d7a6f4109ae2922be1befa.jpg' },
    { titulo: '1984', portada: 'https://imgv2-2-f.scribdassets.com/img/word_document/603486960/original/0468b5a5b9/1?v=1' },
    { titulo: 'Fahrenheit 451', portada: 'https://images.cdn1.buscalibre.com/fit-in/360x360/39/0c/390cf389c0c83ef393d8a0b763e856c0.jpg' },
    { titulo: 'El Principito', portada: 'https://portallibros.com/wp-content/uploads/2021/02/El-principito.jpg' },
    { titulo: 'Crónicas de Narnia', portada: 'https://www.sancristoballibros.com/imagenes/9789584/978958423872.GIF' },
    { titulo: 'El Hobbit', portada: 'https://www.abacus.coop/dw/image/v2/BDLM_PRD/on/demandware.static/-/Sites-AbacusMaster/default/dw86337955/images/large/1408551.74.jpg?sw=740' }
  ];

  librosIngles = [
    { titulo: 'Harry Potter', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0G20FHWpdP2AbWGZ0qV2AjtOrxg9p8a1PNQ&s' },
    { titulo: 'The Hunger Games', portada: 'https://images.cdn1.buscalibre.com/fit-in/360x360/dc/85/dc8571e4d8413ca59fb607542b71cd7c.jpg' },
    { titulo: 'Percy Jackson', portada: 'https://images.cdn1.buscalibre.com/fit-in/360x360/ef/4f/ef4f59b73699ae59088a9d9e156da7fb.jpg' },
    { titulo: 'The Maze Runner', portada: 'https://images.cdn2.buscalibre.com/fit-in/360x360/4d/d3/4dd344231c410700661440099ba6ad0d.jpg' },
    { titulo: 'Wonder', portada: 'https://covers.storytel.com/jpg-640/9788809984684.c2468e0b-a716-4882-b76e-b50868c4de9c?optimize=high&quality=70&width=600' },
    { titulo: 'Artemis Fowl', portada: 'https://images.cdn3.buscalibre.com/fit-in/360x360/f1/f1/f1f19cea50e7cd1f7e528cebc803d1a6.jpg' }
  ];

  librosInfantiles = [
    { titulo: 'Pinocho', portada: 'https://images.cdn2.buscalibre.com/fit-in/360x360/0c/7d/0c7d8af42843059df1e23a1988df8927.jpg' },
    { titulo: 'El Principito', portada: 'https://portallibros.com/wp-content/uploads/2021/02/El-principito.jpg' },
    { titulo: 'Alicia en el País de las Maravillas', portada: 'https://www.elvirrey.com/imagenes/9786124/978612468686.GIF' },
    { titulo: 'Peter Pan', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwqxKxprNXTmoQTaEGGi_F48FQ_104LpxUTA&s' },
    { titulo: 'Charlie y la Fábrica de Chocolate', portada: 'https://www.penguinlibros.com/pe/6711977-large_default/charlie-y-la-fabrica-de-chocolate-coleccion-alfaguara-clasicos.webp' },
    { titulo: 'Matilda', portada: 'https://www.penguinlibros.com/pe/1668046-large_default/matilda-coleccion-alfaguara-clasicos.webp' }
  ];

  librosNoFiccion = [
    { titulo: 'Sapiens', portada: 'https://www.penguinlibros.com/pe/1675383/sapiens-de-animales-a-dioses.jpg' },
    { titulo: 'Educated', portada: 'https://images.cdn3.buscalibre.com/fit-in/360x360/10/81/108127fc81a7d6dcd9d5758fa7942b4a.jpg' },
    { titulo: 'The Body', portada: 'https://images.cdn1.buscalibre.com/fit-in/360x360/4c/92/4c9220c78382edaff112f27ad43e6521.jpg' },
    { titulo: 'Homo Deus', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR74lnISrzyFS38KAQwR4T2sifeZevzgAQIEA&s' },
    { titulo: 'Factfulness', portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzkwE4VuCUKxyrjaOPYYz7GtmIhsFvtQtawA&s' },
    { titulo: 'Becoming', portada: 'https://images.cdn2.buscalibre.com/fit-in/360x360/15/f1/15f1a3a2dea08f3e0504f235918c81f0.jpg' }
  ];


  bannersPublicidad = [
    { imagen: 'https://static.vecteezy.com/system/resources/previews/001/951/434/non_2x/christmas-sale-up-to-50-off-red-discount-banner-for-website-with-christmas-stockings-and-santa-claus-bag-with-presents-vector.jpg', titulo: 'Gran Venta', subtitulo: 'Aprovecha descuentos hasta 50%' },
    { imagen: 'https://www.penguinlibros.com/es/modules/ph_simpleblog/covers/1336-thumb.png', titulo: 'Nuevo Lanzamiento', subtitulo: 'No te pierdas este libro' }
  ];

  activeSlide = 0;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.activeSlide = (this.activeSlide + 1) % this.slidesHero.length;
    }, 4000);
  }
}