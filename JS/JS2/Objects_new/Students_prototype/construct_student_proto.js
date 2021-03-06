// начало --- Функция-конструктор
            function Student(name, sname, grades) {


                // в this пишем свойства, методы
                this.firstname = name;
                this.lastname = sname;
                this.mygrades = grades;



                //-------- Записываем соответственное значение созданного объекта-студента в статическое-свойство-массив. Так же записываем и сам объект.

                Student.allGroup.push(this);		// ------ теперь не надо будет загонять каждый новый объект в массив

                Student.group_name.push(name);
                Student.group_sname.push(sname);
					
					// --------- то же самое, другим способом --------
                Student.group_grades[Student.count] = grades;
                Student.count++;
            }
        // конец --- Функция-конструктор

        //------------- Задаем статические переменные, создаем объекты ------------------------------------

            Student.allGroup = [];

             Student.group_name  =[];
             Student.group_sname  =[];

            Student.count = 0;
            Student.group_grades  =[];

            // console.log(Student.group_name);
            // console.log(Student.group_grades);

            var Vladimir = new Student('Владимир', 'Воробей', [4,4,3,5,4,3]);
            var  Andrey = new Student('Андрей', 'Посредственный', [3,3,3,4,4,4]);
            var  Vyacheslav = new Student('Николай', 'Прототип', [5,5,4,5,5,4]);
            var  Bogdan = new Student('Богдан', 'Босой', [2,3,2,4,3,4]);

// console.log(Student.allGroup);

//------------ Добавляем методы через прототип, далее эти методы будут доступны нашим объектам через ссылку __proto__ 
// 			   т.к. при создании объектов через new им записывается ссылка из prototype функции-конструктора -----------------

// --- Также можно напомнить, что у каждой функции по-умолчанию уже есть свойство prototype ---

        Student.prototype.fullName = function() {
            console.log(this.firstname + ' ' + this.lastname)
        }
		
		// --------- Вычисление среднего значения циклом -----
        Student.prototype.gradesAverage = function() {
            let g = this.mygrades;
            let sum = 0;
            for (let i=0; i<g.length; i++ ) {
                sum+=g[i];
                // console.log(sum);
            }
            return +(sum/g.length).toFixed(2);
        }
        // --------- Вычисление среднего значения с использованием reduce -----
        Student.prototype.gradesAverage2 = function() {
            let g = this.mygrades;
            // alert(g);
            let result = g.reduce(function(sum, current) {
                sum=sum+current;
                return sum;

            });

            return +(result/g.length).toFixed(2);
        }
		



//---------- Функция-вывод из конструктора ----------------------------------------------------------------

        var studentList =[];
        function outFromConstructor () {

            for (let i=0; i<Student.group_name.length; i++) {
                studentList[i] = Student.group_name[i] + ' ' + Student.group_sname[i]

            }

        };

        outFromConstructor ();
        console.log(studentList);

//------- Вывод всех объектов из массива в формате JSON ---------------------------------------------------
        function outStudents() {
            var strStudents = []
            for (var i = 0; i < Student.allGroup.length; i++) {
                strStudents[i]=JSON.stringify(Student.allGroup[i]);

            }
            console.log(strStudents);
        };
        outStudents();
//------------- Функция нахождения лучшего студента ------------------------------------------------------
        function bestStudents() {
                let best = Student.allGroup[0];
            for (var i = 0; i < Student.allGroup.length; i++) {
                if (Student.allGroup[i].gradesAverage()>best.gradesAverage()) {
                    best=Student.allGroup[i]
                }

            }
            console.log(best.firstname + ' ' + best.lastname + ' лучший студент курса. ' + 'Средний бал ' + best.gradesAverage());
            return best;

        };

        bestStudents();

//------------ Сортировка по убыванию относительно лучшего среднего бала -----------------------------------
        // ------ Сортировка в этот раз сделаем встроенным JavaScript методом sort(function) -------------

        var sortStudents = Student.allGroup;

        function compareGradesAverage(a, b) {
            return b.gradesAverage2() - a.gradesAverage2();
        }

        sortStudents.sort(compareGradesAverage);
		console.log('Список:')
//------------- Вывод отсортированого списка ------------------------------------------------------------------

        

        function outstudents2() {
            for (let i=0; i<sortStudents.length; i++) {
                console.log(i+1 + ': ' + sortStudents[i].firstname + ' ' + sortStudents[i].lastname +
                    ' Средний бал = ' + sortStudents[i].gradesAverage());
            }
        };

        outstudents2();
