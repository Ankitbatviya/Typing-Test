const getSelectedValue = (radios) => {

    let selectedValue = '';
    for (const radio of radios) {
        if (radio.checked) {
            selectedValue = radio.value;
            break;
        }
        else{
            selectedValue = false
        }
    }

    return selectedValue;
};

export default getSelectedValue;