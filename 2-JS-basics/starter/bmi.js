// let markMass = prompt('Enter Mark mass'); //kg
// let markHeight = prompt('Enter Mark height'); //m
// let johnMass = prompt('Enter John mass'); //kg
// let johnHeight = prompt('Enter John height'); //m

// const markBMI = markMass * (markHeight^2);
// const johnBMI = johnMass * (johnHeight^2);

// console.log("Is Mark's BMI higher than John's?" + markBMI > johnBMI);

// let teamJohn = (89+120+103) / 3;
// let teamMicke = (116+100+123) / 3;
// let teamMary = (97+134+105) / 3;
// console.log(teamJohn, teamMicke, teamMary);

// teamJohn > teamMicke ? console.log( 'John\'s team won with average score ' + teamJohn ) 
// : console.log( 'Micke\'s team won with average score ' + teamMicke ); 

// switch(true){
//     case (teamJohn > teamMicke && teamJohn > teamMary):
//         console.log('Team John won with average score: ' + teamJohn );
//         break;
//     case (teamMicke > teamJohn && teamMicke > teamMary):
//         console.log('Team Micke won with average score: ' + teamJohn );
//         break;
//     case (teamMary > teamMicke && teamMary > teamJohn):
//         console.log('Team Mary won with average score: ' + teamJohn );
//         break;
//     default:
//         console.log('equal');
// }



// const bils = [124, 48, 268];

// function calcTips(bil) {
//     let percentage;
//     if(bil < 50){
//         percentage = bil * 0.2;
//     } else if (bil >= 50 && bil <= 200){
//         percentage = bil * 0.15;
//     } else {
//         percentage = bil * 0.1;
//     }
//     return percentage;
// }

// const createTips = (bils) => {
//     let tips = [];
//     bils.forEach(element => {
//         tips.push(calcTips(element));
//     });
//     return tips;
// }

// const amounts = (bils) => {
//     const sum = [];
//     const tips = createTips(bils);
//     for (let index = 0; index < bils.length; index++) {
//         sum.push(bils[index] + tips[index]);
//     }
//     return sum;
// }

// let amountsAll = amounts(bils);
// console.log(amountsAll);

// const john = {
//     name: 'John',
//     mass: 72, // kg
//     height: 1.86, // m
//     calcBMI: function () {
//         this.bmi = this.mass / (this.height^2);
//     }
// }

// const micke = {
//     name: 'Mike',
//     mass: 82, // kg
//     height: 1.86, // m
//     calcBMI: function () {
//         this.bmi = this.mass / (this.height^2);
//     }
// }

// john.calcBMI();
// micke.calcBMI();

// john.bmi > micke.bmi ? console.log('John\'s BMI: ' + john.bmi):
// console.log('Micke\'s BMI: ' + micke.bmi);

const john = {
    bils: [124, 48,268, 180, 42],
    calcTips: function() {
        this.tips = [];
        this.bils.forEach(bil => {
            if (bil < 50) {
                this.tips.push(bil * 0.2);
            } else if (bil >= 50 && bil <= 200) {
                this.tips.push(bil * 0.15);
            } else {
                this.tips.push(bil * 0.1);
            }
        });
    },

    calcTotalPay: function() {
        this.totalPay = [];
        for (let index = 0; index < this.bils.length; index++) {
            this.totalPay.push(this.bils[index] + this.tips[index]);
        }
    }
}

const mark = {
    bils: [77, 475, 110, 45],
    calcTips: function() {
        this.tips = [];
        this.bils.forEach(bil => {
            if (bil < 100) {
                this.tips.push(bil * 0.2);
            } else if (bil >= 100 && bil <= 300) {
                this.tips.push(bil * 0.1);
            } else {
                this.tips.push(bil * 0.25);
            }
        });
    },

    calcTotalPay: function() {
        this.totalPay = [];
        for (let index = 0; index < this.bils.length; index++) {
            this.totalPay.push(this.bils[index] + this.tips[index]);
        }
    }
}

const averageTips = function(tips) {
    let sum = 0;
    tips.forEach(tip => {
        sum += tip;
    });
    return sum / tips.length;
}

john.calcTips();
john.calcTotalPay();
mark.calcTips();
mark.calcTotalPay();

console.log(john.totalPay, mark.totalPay);


console.log(averageTips(john.tips));
console.log(averageTips(mark.tips));