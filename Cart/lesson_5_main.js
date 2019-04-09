$(document).ready(() => {
    let product1 = new Product (123, 'Ноутбук', 45600);
    let product2 = new Product (124, 'Клавиатура', 1200);
    let product3 = new Product (125, 'Мышь для ПК', 600);

    let mycart = new Cart('lesson_5_getCart.json');
    $('.buyBtn').click(e => {
        mycart._addProduct(e.target);
    });
    // $('#cart').on('click', '.del-btn', () => {}); 
    // добавление обработчика события кнопки удаления
    let feed = new Feedback('lesson_5_feedback.json');
});