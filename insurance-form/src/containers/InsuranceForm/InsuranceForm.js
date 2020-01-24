import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './InsuranceForm.module.css';


class InsuranceForm extends Component {
    state = {
        insuranceForm: {
        businessName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: ''
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 2000
                },
                valid: false,
                touched: false
                },
        stateNameUS: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: ''
            },
            value: '',
            validation: {
                required: true,
                stateList: [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ]
            },
            valid: false,
            touched: false
        },
        primaryBusiness: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {'value': 'landscaping', 'displayValue': 'Landscaping'},
                    {'value': 'softwareDevelopment', 'displayValue': 'Software Development'},
                    {'value': 'accounting', 'displayValue': 'Accounting'}
                ]
            },
            value: 'Landscaping',
            validation: {
                rule1:[ 'AL', 'accounting'],
                rule2:['Tx', 'software development']
            },
            valid: true
        },
        contract: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {'value': 'yes', 'displayValue': 'Yes'},
                    {'value': 'no', 'displayValue': 'No'}
                ]
            },
            value: '',
            validation: {
                rule1:[ 'AL', 'accounting'],
                rule2:['Tx', 'software development']
            },
            valid: true
        }
    },
        askContract : [],
        formIsValid :false
    }

    insuranceFormHandler = ( event ) => {
        event.preventDefault();
        const InsuranceFormSummary = {'businessName': this.state.insuranceForm.businessName.value,
            'stateNameUS': this.state.insuranceForm.stateNameUS.value,
            'primaryBusiness': this.state.insuranceForm.primaryBusiness.value}
        if(this.state.insuranceForm.contract.value !== ''){
            InsuranceFormSummary['contract'] = this.state.insuranceForm.contract.value;
        }


        if(this.state.formIsValid){
             alert(JSON.stringify(InsuranceFormSummary));
        }    
        return null;
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.stateList){
            isValid = rules.stateList.includes(value)
        }
        if(rules.businessList){
            isValid = rules.businessList.includes(value)
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedInsuranceForm = {
            ...this.state.insuranceForm
        };
        const updatedFormElement = { 
            ...updatedInsuranceForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedInsuranceForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedInsuranceForm) {
            formIsValid = updatedInsuranceForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({insuranceForm: updatedInsuranceForm, formIsValid: formIsValid});
    }
    render () {
        const formElementsArray = [];
        for (let key in this.state.insuranceForm) {
            formElementsArray.push({
                id: key,
                config: this.state.insuranceForm[key]
            });
        }
        let form = (
            <form onSubmit={this.insuranceFormHandler}>
                {formElementsArray.map(formElement => {
                    if(formElement.id === "businessName"){
                        return <React.Fragment  key={formElement.id}>
                            <label className={classes.Label}>what is your business name?</label>
                            <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                        </React.Fragment>
                    }
                    else if (formElement.id === "stateNameUS"){
                        return <React.Fragment  key={formElement.id}>
                        <label className={classes.Label}>In which US state does your business operate?</label>
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    </React.Fragment>
                    }
                    else if (formElement.id === "primaryBusiness"){
                        return <React.Fragment  key={formElement.id}>
                        <label className={classes.Label}>What is your primary business</label>
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} 
                            askContract = {(event)=> this.askContract(event)} />
                    </React.Fragment>
                    }
                    else if (formElement.id === "contract"){
                        if(this.state.insuranceForm.primaryBusiness.value === 'softwareDevelopment' && 
                            this.state.insuranceForm.stateNameUS.value === 'TX'){
                                 return <React.Fragment  key={formElement.id}>
                                    <label className={classes.Label}>Do you always use contracts when engaging with your clients?</label>
                                    <Input 
                                        key={formElement.id}
                                        elementType={formElement.config.elementType}
                                        elementConfig={formElement.config.elementConfig}
                                        value={formElement.config.value}
                                        invalid={!formElement.config.valid}
                                        shouldValidate={formElement.config.validation}
                                        touched={formElement.config.touched}
                                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                                    </React.Fragment>
                        }
                        else if(this.state.insuranceForm.primaryBusiness.value === 'accounting' && 
                        this.state.insuranceForm.stateNameUS.value === 'AL'){
                             return <React.Fragment  key={formElement.id}>
                                <label className={classes.Label}>Do you always use contracts when engaging with your clients?</label>
                                <Input 
                                    key={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    invalid={!formElement.config.valid}
                                    shouldValidate={formElement.config.validation}
                                    touched={formElement.config.touched}
                                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                                </React.Fragment>
                         }
                    }
                })}
                <Button btnType="Success" style={{marginLeft:'20px'}}>Get Quote</Button>
            </form>
        );
        return (
            <div className={classes.InsuranceForm}>
                <h4 style={{marginLeft:'10px',color:'green',fontStyle:'italic'}}>Enter your Insurance Details</h4>
                {form}
            </div>
        );
    }
}

export default InsuranceForm;