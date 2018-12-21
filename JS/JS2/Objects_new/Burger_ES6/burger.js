class Menu {

    constructor(burgerName, burgerAdds, burgerAdds2) {
        this.nBurger = burgerName;
        this.addsBurger = burgerAdds;
        this.adds2Burger = burgerAdds2;


        this.burger = {
            small: {
                price: 50,
                calories: 40,
                named: 'Маленький бургер'
            },

            big: {
                price: 100,
                calories: 60,
                named: 'Большой бургер'
            },
            // ---  делаем запасной бургер, для не знающих наш ресторан:)
            guest: {
                price: 30,
                calories: 25,
                named: 'Гостевой мини-бургер'
            }
        };

        this.adds = {
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

        this.adds2 = {

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
    }

// ------------------------------------------- Функция считающая цену и калории ---------------
    // ---- метод записываются в Menu.prototype -------------

    countBurgerPrice() {
        let b = this.nBurger;
        let a1 = this.addsBurger;
        let a2 = this.adds2Burger;

        const burger = this.burger;
        const adds = this.adds;
        const adds2 = this.adds2;

        let rA = Math.ceil(Math.random()*3);

        // console.log(rA);
        // ------------------- также для не знающих ключевых слов делаем случаюную обязательную добавку
        function randomAdds() {
            let resRandomAdds =[];

            let resP, resC, resN;
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
        let bp;
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
        let ap;
        switch (a1) {
            case 'cheese':  ap = adds.cheese.price; break;
            case 'salad':  ap = adds.salad.price; break;
            case 'potato': ap = adds.potato.price; break;
            // default: ap = adds.cheese.price; break;
            default: ap = randomAdds()[0];


        }

        let ap2;
        switch (a2) {
            case 'spicies': ap2 = adds2.spicies.price; break;
            case 'mayo': ap2 = adds2.mayo.price; break;
            default: ap2 = 0; break;

        }

        // --- Цена бургера ----
        let resP = bp;
        // --- Цена бургера с добавками ---
        resP = bp+ap+ap2;
        // console.log('Цена ' + resP + ' ' + bp + ap + ap2);
// -------------------------------- условия для калорий -----------------
        let bk;
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
        let ak;
        switch (a1) {
            case 'cheese':  ak = adds.cheese.calories; break;
            case 'salad':  ak = adds.salad.calories; break;
            case 'potato': ak = adds.potato.calories; break;
            // default: ak = adds.cheese.calories; break;
            default: ak = randomAdds()[1];
            // console.log(randomAdds());
            // console.log(ak);
        }

        let ak2;
        switch (a2) {
            case 'spicies': ak2 = adds2.spicies.calories; break;
            case 'mayo': ak2 = adds2.mayo.calories; break;
            default: ak2 = 0; break;

        }
        // Калорийность бургера
        let resC = bk;
        // --- Калорийность бургера с добавками ---
        resC = bk+ak+ak2;
        // console.log('Калории ' + resC);
        // -------------------- блок "ваше меню" -------------------------------------------
        let bn;
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
        let an;
        switch (a1) {
            case 'cheese':  an = adds.cheese.named; break;
            case 'salad':  an = adds.salad.named; break;
            case 'potato': an = adds.potato.named; break;
            // default: an = adds.cheese.named; break;
            default: an = randomAdds()[2];

        }

        let an2;
        switch (a2) {
            case 'spicies': an2 = adds2.spicies.named; break;
            case 'mayo': an2 = adds2.mayo.named; break;
            default: an2 = 'Без добавок'; break;

        }

        let resN;
        // -- вывод с использованием шаблонных строк ES6
        // -- названия бургера и добавок ----
        resN = (`Ваш заказ: ${bn}; дополнительно: ${an}; другие добавки ${an2} \n`);
        // console.log(randomAdds());

        return (`${resN} Цена бургера: '${resP}, калорийность: ${resC}`);

    }


}

// -- ключевые слова для бургеров: big, small
// -- ключевые слова для обязательной добавки: cheese, salad, potato
// -- ключевые слова для остальных добавок: mayo, spicies


let myBurger1 = new Menu('small', 'potato');
let myBurger2 = new Menu('big', 'salad', 'mayo');
let myBurger3 = new Menu('burger', 'some', 'yo'); // -- намерено сделана ошибка

console.log(myBurger1);
console.log(myBurger1.countBurgerPrice());
console.log(myBurger2);
console.log(myBurger2.countBurgerPrice());
console.log('Никого не оставим голодным! :)');
console.log(myBurger3);
console.log(myBurger3.countBurgerPrice());
