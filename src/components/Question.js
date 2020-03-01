import React, {useState} from 'react'
import { Grid, Radio, Form } from 'semantic-ui-react';

const Question = (props) => {

    const [state, setState] = useState({
        value: ''
    });

    const handleChange = (e, { value }) => setState({ value: value })

    const radioButtons = props.question.words.map(word => {
        return (
            <Form.Field>
                <Radio
                    style={{fontSize: '1.5em'}}
                    key={word.id}
                    label={word.translation}
                    name='radioGroup'
                    value={word.id.toString()}
                    checked={state.value === word.id.toString()}
                    onChange={handleChange} />
            </Form.Field>
        )
    });


    const rightWord = props.question.words[props.question.rightWord];
    return (
        <Grid>
            <Grid.Row centered>
                <Grid.Column 
                    verticalAlign='bottom'
                    style={{fontSize: '2.2em'}}>
                    What {rightWord.word} means?
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column 
                    verticalAlign='top'
                    textAlign='center' >
                    <Form>
                        {radioButtons}
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Question;