// ============================================================
// BREI-BOX — TIPADO DE PRODUCTOS (JSDoc)
// ============================================================

/**
 * @typedef {"guitarra" | "amplificador" | "pedal"} CategoriaProducto
 */

/**
 * @typedef {Object} Producto
 * @property {string}            id              - Slug único (ej. "gibson-les-paul-classic").
 * @property {string}            nombre          - Nombre completo del producto.
 * @property {string}            descripcion     - Texto descriptivo para el accordion.
 * @property {string[]}          caracteristicas - Especificaciones técnicas para el accordion.
 * @property {number}            precio          - Precio en euros (número sin formato).
 * @property {string}            imagen          - Ruta relativa desde html/ (ej. "../img/…/foto.jpg").
 * @property {CategoriaProducto} categoria       - Categoría del producto.
 */

/**
 * @typedef {Object} CatalogoCategorias
 * @property {Producto[]} guitarras
 * @property {Producto[]} amplificadores
 * @property {Producto[]} pedales
 */