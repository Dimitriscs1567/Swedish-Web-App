import React, {useState} from 'react'
import { Grid, Radio, Form } from 'semantic-ui-react';
import useWindowDimensions from '../custom_hooks/UseWindowDimensions'

const Question = (props) => {

    const {width, height} = useWindowDimensions();

    const [state, setState] = useState({
        value: ''
    });

    const handleChange = (e, { value }) => setState({ value: value })

    const radioButtons = props.otherWords.map(word => {
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

    return (
        <Grid style={{height: height}}>
            <Grid.Row centered>
                <Grid.Column 
                    verticalAlign='bottom'
                    style={{fontSize: '2.2em'}}>
                    What {props.word.word} means?
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column 
                    verticalAlign='top'
                    textAlign='center' >
                    <Form>
                        <Form.Field>
                            <Radio
                                style={{fontSize: '1.5em'}}
                                key={props.word.id}
                                label={props.word.translation}
                                name='radioGroup'
                                value={props.word.id.toString()}
                                checked={state.value === props.word.id.toString()}
                                onChange={handleChange} />
                        </Form.Field>
                        {radioButtons}
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Question;