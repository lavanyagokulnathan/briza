import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './InsuranceForm.module.css';


class InsuranceForm extends Component {
    state = {
        insuranceForm: {
            businessName: {
                elementLabel: "What is your business name?",
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: ''
                },
                validation: {
                    type: "text",
                    required: true,
                    minLength: 2,
                    maxLength: 5
                }
            },
            stateNameUS: {
                elementLabel: "In which US state does your business operate?",
                elementType: 'select',
                elementConfig: {
                    options: [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ]
                },
                value: "AL"
            },
            primaryBusiness: {
                elementLabel: "What is your primary business",
                elementType: 'select',
                elementConfig: {
                    options: [ 'landscaping', "software development", "accounting"]
                },
                value: "landscaping"
            },
            contract: {
                elementLabel: "Do you always use contracts when engaging with your clients?",
                elementType: 'select',
                elementConfig: {
                    options: [ "yes", "no"]
                },
                displayCondition: {
                    rules: () => this.contractDispalyValidation()
                },
                value: "yes"
            }
        },
        formIsValid: false
    }

    contractDispalyValidation = () => {
        return ((this.state.insuranceForm.stateNameUS.value !== undefined 
            && this.state.insuranceForm.stateNameUS.value === "AL" 
            && this.state.insuranceForm.primaryBusiness.value !== undefined
            && this.state.insuranceForm.primaryBusiness.value === "accounting")
            || (this.state.insuranceForm.stateNameUS.value !== undefined 
                && this.state.insuranceForm.stateNameUS.value === "TX" 
                && this.state.insuranceForm.primaryBusiness.value !== undefined
                && this.state.insuranceForm.primaryBusiness.value === "software development"));
    }

    insuranceFormHandler = ( event ) => {
        event.preventDefault();
        const InsuranceFormSummary = {'businessName': this.state.insuranceForm.businessName.value,
            'stateNameUS': this.state.insuranceForm.stateNameUS.value,
            'primaryBusiness': this.state.insuranceForm.primaryBusiness.value}
        if(this.contractDispalyValidation()){
            InsuranceFormSummary['contract'] = this.state.insuranceForm.contract.value;
        }
        if (this.state.insuranceForm.businessName.isValid) {
                alert(JSON.stringify(InsuranceFormSummary));
                return;
        }
        alert("Error in form");
    }

    checkCondition(condition, conditionVal, value) {
        let isValid = true;
        switch(condition) {
            case 'required': 
                isValid =  value.trim() !== '';
                break;
            case 'minLength':
                isValid = value.length >= conditionVal;
                break;
            case 'maxLength':
                isValid = value.length <= conditionVal;
                break;
            default:
                isValid = true;
        }
        return isValid;
    }

    checkValidity(event, elementKey, element) {
        const value = event.target.value;
        let validationNeeded = true;
        let isValid = false;
        if (element.validation === undefined) {
            validationNeeded = false;
            isValid = true;
        }

        if(validationNeeded === true){
            const rules = element.validation;

            for (let condition in rules) {
                isValid = this.checkCondition(condition, rules[condition], value);
                //if one of the conditions fail, exit
                if(!isValid){
                    break;
                }
            }
        }
       
        element.isValid = isValid;

        if(isValid){
            element.value = value;
        }
         
        //getting a copy
        const updatedInsuranceForm = {
            ...this.state.insuranceForm
        };
        updatedInsuranceForm[elementKey]=element;
        this.setState({insuranceForm: updatedInsuranceForm});
    }

    enableDisplay(element) {
        let displayEnabled = true;
        //if no displayConditions found..return true
        if (element.displayCondition === undefined) {
            return displayEnabled;
        }
        return element.displayCondition.rules();
    }

    render () {
        let form = (
            <div className={classes.InsuranceForm}>
                <h4 style={{marginLeft:'10px',color:'green',fontStyle:'italic'}}>Enter your Insurance Details</h4>
                <form onSubmit={this.insuranceFormHandler}>
                    { Object.keys(this.state.insuranceForm).map( key => { 
                        let formElement = this.state.insuranceForm[key];
                        return <Input 
                        key={key}
                        id={key}
                        isvalid={formElement.isValid}
                        label={formElement.elementLabel}
                        elementType={formElement.elementType}
                        elementConfig={formElement.elementConfig}
                        displayEnabled={this.enableDisplay(formElement)}
                        changed={(event) => this.checkValidity(event, key, formElement)} />             
                    })}
                    <Button btnType="Success" style={{marginLeft:'20px'}}>Get Quote</Button>
                </form>
            </div>
        );
        return form;
    }
}

export default InsuranceForm;