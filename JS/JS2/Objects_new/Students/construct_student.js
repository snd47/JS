 // начало --- Функция-конструктор
            function Student(name, sname, grades) {


                // в this пишем свойства, методы
                this.firstname = name;
                this.lastname = sname;
                this.mygrades = grades;

                this.fullName = function() {
                    console.log(this.firstname + ' ' + this.lastname)
                }
                // --------- Вычисление среднего значения -----
                this.gradesAverage = function() {
                    let g = this.mygrades;
                    // alert(g);
                     let result = g.reduce(function(sum, current) {
                         sum=sum+current;
                         return sum;

                    });

                    return +(result/g.length).toFixed(2);
                }

                this.gradesAverage2 = function() {
                    let g = this.mygrades;
                    let sum = 0;
                    for (let i=0; i<g.length; i++ ) {
                     sum+=g[i];
                        // console.log(sum);
                    }
                    return +(sum/g.length).toFixed(2);
                }

                //-------- Записываем соответственное значение созданного объекта-студента в статическое-свойство-массив.

                Student.group_name.push(name);
                Student.group_sname.push(sname);

                Student.group_grades[Student.count] = grades;
                Student.count++;
            }
        // конец --- Функция-конструктор




        //------------- Задаем статические переменные, создаем объекты ------------------------------------

             Student.group_name  =[];
             Student.group_sname  =[];

            Student.count = 0;
            Student.group_grades  =[];

            // console.log(Student.group_name);
            // console.log(Student.group_grades);




            var allStudents = [];

            var Vladimir = new Student('Владимир', 'Воробей', [4,4,3,5,4,3]);
            allStudents[0]=Vladimir;
            var  Andrey = new Student('Андрей', 'Посредственный', [3,3,3,4,4,4]);
            allStudents[1]=Andrey;
            var  Vyacheslav = new Student('Николай', 'Король', [5,5,4,5,5,4]);
            allStudents[2]=Vyacheslav;

             var  Bogdan = new Student('Богдан', 'Босой', [2,3,2,4,3,4]);
               allStudents[3]=Bogdan;



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
            for (var i = 0; i < allStudents.length; i++) {
                strStudents[i]=JSON.stringify(allStudents[i]);

            }
            console.log(strStudents);
        };
        outStudents();
//------------- Функция нахождения лучшего студента ------------------------------------------------------
        function bestStudents() {
                let best = allStudents[0];
            for (var i = 0; i < allStudents.length; i++) {
                if (allStudents[i].gradesAverage()>best.gradesAverage()) {
                    best=allStudents[i]
                }

            }
            console.log(best.firstname + ' ' + best.lastname + ' лучший студент курса. ' + 'Средний бал ' + best.gradesAverage());
            return best;

        };

        bestStudents();

//------------ Сортировка по убыванию относительно лучшего среднего бала -----------------------------------

        var sortStudents = allStudents;
        function BubbleSort(sortStudents)
        {
            var n = sortStudents.length;
            for (var i = 0; i < n-1; i++)
            { for (var j = 0; j < n-1; j++)
             { if (sortStudents[j].gradesAverage2() < sortStudents[j+1].gradesAverage2())
              {
                  var t = sortStudents[j];
                  sortStudents[j] = sortStudents[j+1];
                  sortStudents[j+1] = t;
              }
             }
            }
            return sortStudents;
        };



//------------- Вывод отсортированого списка ------------------------------------------------------------------

        BubbleSort(sortStudents);

        function outstudents2() {
            for (let i=0; i<sortStudents.length; i++) {
                console.log(i+1 + ': ' + sortStudents[i].firstname + ' ' + sortStudents[i].lastname +
                    ' Средний бал = ' + sortStudents[i].gradesAverage());
            }
        };

        outstudents2();

        // alert(Vladimir.firstname);
        // alert(Vladimir.mygrades[3]);

        // Vyacheslav.fullName();

        // console.log(Vladimir.gradesAverage());

        // console.log(typeof(Vyacheslav.gradesAverage2()));

        // console.log(Object.keys(Vladimir));
        //  console.log(Object.getOwnPropertyNames(Vladimir));