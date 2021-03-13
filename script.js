class Calculator{
    constructor(prevouiseoperandtextelement,currentoperandtextelement) {
        this.prevouiseoperandtextelement = prevouiseoperandtextelement
        this.currentoperandtextelement = currentoperandtextelement
        this.clear()
    }

    clear(){
        this.currentoperand = ''
        this.prevouiseoperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentoperand = this.currentoperand.toString().slice(0, -1)
    }

    appendnumber(number){
        if(number==='.' && this.currentoperand.includes('.')) return
        this.currentoperand = this.currentoperand.toString()+number.toString();
    }

    chooseoperation(operation){
        if(this.currentoperand === '') return
        if(this.prevouiseoperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.prevouiseoperand = this.currentoperand
        this.currentoperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.prevouiseoperand)
        const current = parseFloat(this.currentoperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentoperand = computation
        this.operation = undefined
        this.prevouiseoperand = ''
    }

    getdisplaynumber(number){
        const stringnumber = number.toString()
        const integerdigits = parseFloat(stringnumber.split('.')[0])
        const decimaldigits = stringnumber.split('.')[1]
        let integerdisplay
        if (isNaN(integerdigits)){
            integerdisplay = ''
        }else {
            integerdisplay = integerdigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if(decimaldigits != null){
            return `${integerdisplay}.${decimaldigits}`
        }else {
            return integerdisplay
        }
    }



    updatedisplay(){
        this.currentoperandtextelement.innerText =
            this.getdisplaynumber(this.currentoperand)
        if(this.operation != null) {
            this.prevouiseoperandtextelement.innerText =
                `${this.getdisplaynumber(this.prevouiseoperand)} ${this.operation}`
            }else{
            this.prevouiseoperandtextelement.innerText = ''
        }
    }
}



const numberbuttons = document.querySelectorAll('[data-number]')
const operationbuttons = document.querySelectorAll('[data-operation]')
const equalbutton = document.querySelector('[data-equals]')
const deletebutton = document.querySelector('[data-delete]')
const allclearbutton = document.querySelector('[data-all-clear]')
const prevouiseoperandtextelement = document.querySelector('[data-previouse-operand]')
const currentoperandtextelement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(prevouiseoperandtextelement, currentoperandtextelement)

numberbuttons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.appendnumber(button.innerText)
        calculator.updatedisplay()
    })
})


operationbuttons.forEach(button => {
    button.addEventListener('click',() => {
        calculator.chooseoperation(button.innerText)
        calculator.updatedisplay()
    })
})


equalbutton.addEventListener('click', button => {
    calculator.compute()
    calculator.updatedisplay()
})


allclearbutton.addEventListener('click', button => {
    calculator.clear()
    calculator.updatedisplay()
})

deletebutton.addEventListener('click', button => {
    calculator.delete()
    calculator.updatedisplay()
})











