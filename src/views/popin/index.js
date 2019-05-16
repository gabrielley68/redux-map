import React from 'react';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {getCurrentPointerId} from "../../store/reducers/pointer";
import {deletePointer, setName} from "../../store/actions/pointer";

class Popin extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: ""
        }
    }

    render() {
        return (
            <div className="Popin">
                <div className={"panel"}>
                    <label>Nom</label>
                    <input type={"text"} onChange={e => this.setState({name: e.target.value})}/>
                    <br/>
                    <button onClick={() => this.props.dispatch(setName(this.props.currentPointer, this.state.name))}>Ok</button>
                    <br/><br/>
                    <button onClick={() => this.props.dispatch(deletePointer(this.props.currentPointer))}>Supprimer</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentPointer: getCurrentPointerId(state)
});

const enhance = compose(connect(mapStateToProps));

export default enhance(Popin);

