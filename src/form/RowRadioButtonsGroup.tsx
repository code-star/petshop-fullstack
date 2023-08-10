import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup() {
    return (
        <FormControl>
            <FormLabel id="pet-type">Type</FormLabel>
            <RadioGroup
                row
                aria-labelledby="pet-type"
                name="pet-type"
            >
                <FormControlLabel value="CAT" control={<Radio />} label="Cat" />
                <FormControlLabel value="DOG" control={<Radio />} label="Dog" />
            </RadioGroup>
        </FormControl>
    );
}