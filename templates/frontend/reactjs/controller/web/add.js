/**
 * Created by zhangyq on 2016/9/15.
 */

import React from 'react';
import {
    Container,
    Grid,
    Col,
    Group,
    Icon,
    List,
    Field,
    Button,
    Switch,
} from 'amazeui-touch';

let fields = [
    {
        label: 'Username',
        type: 'text',
        icon: 'person'
    },
    {
        label: 'Password',
        type: 'password',
        icon: 'info'
    },
    {
        label: 'Birth date',
        type: 'date',
        icon: 'refresh'
    }
];

const devices = ['iPhone 6', 'MacBook Pro Retina', 'iMac 5K'];

function handleSwitch() {
    console.log(this.getValue());
}

const mySwitch = <Switch onValueChange={handleSwitch} defaultChecked />;

const AddForm = React.createClass({
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.refs.select.getValue());
    },

    render() {
        return (
            <Container {...this.props} scrollable >
    <Group
    header="基本样式"
    >

    <%
    var  columns = [];
    for (var field in data.moduleDefine){
        var fieldName = data.moduleDefine[field].dName;
        var fieldShow = data.moduleDefine[field].show;
        var fieldRefer =  data.moduleDefine[field].refer;

        var keyName = field;
        columns.push(keyName);
        if (fieldShow=="image"){
            %>
        <input id="file" type="file" name="file" onchange="changePicUrl()" />

            <%}else if (fieldRefer){%>
        <Field
            type="select"
            label="<%=fieldName%>"
            ref="add-<%=keyName%>"
            name="add-<%=keyName%>"
            defaultValue="m"
                >
                <option value="m">Male</option>
                <option value="f">Female</option>
            </Field>
            <%}else if ((field!='id') && (field!='_id')){%>
        <Field
            name ="add-<%=keyName%>"
            label="<%=fieldName%>"
            placeholder="<%=fieldName%>."
            />
            <%}}%>
                </Group>


                {/*<h3>Range</h3>
                 <p>
                 <input type="range" />
                 </p>

                 <h3>Progress</h3>
                 <p>
                 <progress value="50" max="100" />
                 <progress max="100" />
                 <progress className="high" value="25" max="100" />
                 <progress className="medium" value="75" max="100" />
                 <progress className="low" value="60" max="100" />
                 </p>

                 <h3>Meter</h3>
                 <p>
                 <meter
                 min="0"
                 max="100"
                 low="25"
                 high="75"
                 optimum="100"
                 value="10"
                 />
                 <meter min="0" max="100" low="25" high="75" optimum="100"
                 value="50" />
                 <meter min="0" max="100" low="25" high="75" optimum="100"
                 value="80" />
                 </p>*/}

                <Group
                    header="Form Set"
                    >
                    <div className="form-set">
                        <Field placeholder="Name." />
                        <Field placeholder="Email." />
                        <Field placeholder="Password." />
                    </div>

                    <Button amStyle="primary" block>提交</Button>
                </Group>

                <Group
                    header="Field Group"
                    >
                    <Field
                        placeholder="You domain."
                        labelBefore="www."
                        labelAfter=".com"
                        containerClassName="my-group"
                        />

                    <Field
                        placeholder="Your email."
                        labelBefore={<Icon name="person" />}
                        btnAfter={<Button>Subscribe</Button>}
                        />

                    <Field
                        placeholder="Keywords..."
                        labelBefore={<Icon name="search" />}
                        btnAfter={<Button>Search</Button>}
                        />
                </Group>

                <h2>Form in List</h2>

                <Group
                    header="Fields List"
                    noPadded
                    >
                    <List>
                        {fields.map((field, i) => {
                            return (
                                <List.Item
                                    key={i}
                                    nested="input"
                                    >
                                    <Field
                                        {...field}
                                        label={null}
                                        placeholder={field.label + '...'}
                                        />
                                </List.Item>
                            );
                        })}
                    </List>
                </Group>

                <Group
                    header="With Label"
                    noPadded
                    >
                    <List>
                        {fields.map((field, i) => {
                            return (
                                <List.Item
                                    key={i}
                                    nested="input"
                                    >
                                    <Field
                                        {...field}
                                        placeholder={field.label + '...'}
                                        />
                                </List.Item>
                            );
                        })}

                        <List.Item
                            title="Switch"
                            nested="input"
                            after={mySwitch}
                            />
                    </List>
                </Group>

                <Group
                    header="List with Icon"
                    noPadded
                    >
                    <List>
                        {fields.map((field, i) => {
                            return (
                                <List.Item
                                    key={i}
                                    media={<Icon name={field.icon} />}
                                    nested="input"
                                    >
                                    <Field
                                        {...field}
                                        label={null}
                                        placeholder={field.label + '...'}
                                        />
                                </List.Item>
                            );
                        })}
                    </List>
                </Group>

                <Group
                    header="List with Label & Icon"
                    noPadded
                    >
                    <List>
                        {fields.map((field, i) => {
                            return (
                                <List.Item
                                    key={i}
                                    media={<Icon name={field.icon} />}
                                    nested="input"
                                    >
                                    <Field
                                        {...field}
                                        placeholder={field.label + '...'}
                                        />
                                </List.Item>
                            );
                        })}
                    </List>
                </Group>

                <h3>Checkboxes & Radios</h3>

                <Group
                    header="Checkboxes"
                    footer="点击列表选择"
                    noPadded
                    >
                    <List>
                        {devices.map((device, i) => {
                            return (
                                <List.Item
                                    nested="checkbox"
                                    key={i}
                                    >
                                    <Field
                                        label={device}
                                        type="checkbox"
                                        name="checkbox-list-1"
                                        >
                                    </Field>
                                </List.Item>
                            );
                        })}
                    </List>
                </Group>

                <Group
                    header="Radios"
                    footer="点击选择一项"
                    noPadded
                    >
                    <List>
                        {devices.map((device, i) => {
                            return (
                                <List.Item
                                    nested="radio"
                                    key={i}
                                    >
                                    <Field
                                        label={device}
                                        type="radio"
                                        name="radio-list-1"
                                        >
                                    </Field>
                                </List.Item>
                            );
                        })}
                    </List>
                </Group>
            </Container>
        );
    }
});

export default AddForm;
