function Menu(burgerName, burgerAdds, burgerAdds2) {

    var burger =  {
        small : {
            price: 50,
            calories: 40,
            named: 'Маленький бургер'
        },

        big : {
            price: 100,
            calories: 60,
            named: 'Большой бургер'
        },
        // ---  делаем запасной бургер, для не знающих наш ресторан:)
        guest : {
            price: 30,
            calories: 25,
            named: 'Гостевой мини-бургер'
        }
    };

    var adds = {
        cheese: {
            price: 10,
            calories: 20,
            named: 'Сыр'
        },
        salad: {
            price: 20,
            calories: 5,
            named: 'Салат'
        },
        potato: {
            price: 15,
            calories: 10,
            named: 'Картошка'
        }
    };

    var adds2 = {

        spicies: {
            price: 15,
            calories: 0,
            named: 'Специи'
        },
        mayo: {
            price: 20,
            calories: 5,
            named: 'Майонез'
        }
    };

    this.nBurger = burgerName;
    this.addsBurger = burgerAdds;
    this.adds2Burger = burgerAdds2;
// ------------------------------------------- Функция считающая цену и калории ---------------
    this.countBurgerPrice = function() {
        var b = this.nBurger;
        let a1 = this.addsBurger;
        let a2 = this.adds2Burger;

        var rA = Math.ceil(Math.random()*3);
        // var resRandomAdds =[];
        // console.log(rA);
        // ------------------- также для не знающих ключевых слов делаем случаюную обязательную добавку
        function randomAdds() {
            var resRandomAdds =[];

            var resP, resC, resN;
            // r = Math.ceil(Math.random()*3);
            if (rA == 1) {
                resP = adds.cheese.price; resRandomAdds.push(resP);
                resC = adds.cheese.calories; resRandomAdds.push(resC);
                resN = adds.cheese.named; resRandomAdds.push(resN);
            }
            if (rA == 2) {
                resP = adds.salad.price; resRandomAdds.push(resP);
                resC = adds.salad.calories; resRandomAdds.push(resC);
                resN = adds.salad.named; resRandomAdds.push(resN);
            }
            if (rA == 3) {
                resP = adds.potato.price; resRandomAdds.push(resP);
                resC = adds.potato.calories; resRandomAdds.push(resC);
                resN = adds.potato.named; resRandomAdds.push(resN);
            }

            return resRandomAdds;

        }

        //  randomAdds();
        // console.log(resRandomAdds);
        // console.log(randomAdds());

// ------------------------------ условия для стоимости -------------
        var bp;
        if (b == 'small') {
            bp = burger.small.price; // let не работает, т.к. остается в цикле
        }

        // console.log(b == 'small');
        // console.log(bp);

        else if (b == 'big') {
            bp = burger.big.price;
        }

        else  {         //if (b!='small' || b!='big')
            bp = burger.guest.price;
        }
        // console.log(b);
        // console.log(typeof(b));
        // -----------------------------------------
        var ap;
        switch (a1) {
            case 'cheese':  ap = adds.cheese.price; break;
            case 'salad':  ap = adds.salad.price; break;
            case 'potato': ap = adds.potato.price; break;
            // default: ap = adds.cheese.price; break;
            default: ap = randomAdds()[0];

        }

        var ap2;
        switch (a2) {
            case 'spicies': ap2 = adds2.spicies.price; break;
            case 'mayo': ap2 = adds2.mayo.price; break;
            default: ap2 = 0; break;

        }

        var resP = bp;
        resP = bp+ap+ap2;
        // console.log('Цена ' + resP + ' ' + bp + ap + ap2);
// -------------------------------- условия для калорий -----------------
        var bk;
        if (b == 'small') {
            bk = burger.small.calories;
        }

        else if (b == 'big') {
            bk = burger.big.calories;
        }

        else {
            bk = burger.guest.calories;
        }
        // -----------------------------------------
        var ak;
        switch (a1) {
            case 'cheese':  ak = adds.cheese.calories; break;
            case 'salad':  ak = adds.salad.calories; break;
            case 'potato': ak = adds.potato.calories; break;
            // default: ak = adds.cheese.calories; break;
            default: ak = randomAdds()[1];
            // console.log(randomAdds());
            // console.log(ak);
        }

        var ak2;
        switch (a2) {
            case 'spicies': ak2 = adds2.spicies.calories; break;
            case 'mayo': ak2 = adds2.mayo.calories; break;
            default: ak2 = 0; break;

        }

        var resC = bk;
        resC = bk+ak+ak2;
        // console.log('Калории ' + resC);
        // -------------------- блок "ваше меню" -------------------------------------------
        var bn;
        if (b == 'small') {
            bn = burger.small.named;
        }

        else if (b == 'big') {
            bn = burger.big.named;
        }

        else {
            bn = burger.guest.named;
        }
        // -----------------------------------------
        var an;
        switch (a1) {
            case 'cheese':  an = adds.cheese.named; break;
            case 'salad':  an = adds.salad.named; break;
            case 'potato': an = adds.potato.named; break;
            // default: an = adds.cheese.named; break;
            default: an = randomAdds()[2];

        }

        var an2;
        switch (a2) {
            case 'spicies': an2 = adds2.spicies.named; break;
            case 'mayo': an2 = adds2.mayo.named; break;
            default: an2 = 'Без добавок'; break;

        }

        var resN;

        resN = ('Ваш заказ: ' + bn + '; дополнительно: ' + an + '; другие добавки: ' + an2 + '\n');

        // console.log(randomAdds());

        // -- соеденили всё в одну строку ---
        return (resN + ' Цена бургера: ' + resP + ', ' + 'калорийность: ' + resC);

    }
}

// -- ключевые слова для бургеров: big, small
// -- ключевые слова для обязательной добавки: cheese, salad, potato
// -- ключевые слова для остальных добавок: mayo, spicies

// -- создаём бургеры, как новые объекты ----

var myBurger1 = new Menu('small', 'potato');
var myBurger2 = new Menu('big', 'salad', 'mayo');
var myBurger3 = new Menu('burger', 'some', 'yo'); // -- намерено сделаем ошибку ключевого слова в этом бургере

console.log(myBurger1);
console.log(myBurger1.countBurgerPrice());
console.log(myBurger2);
console.log(myBurger2.countBurgerPrice());
console.log('Никого не оставим голодным! :)');
console.log(myBurger3);
console.log(myBurger3.countBurgerPrice());