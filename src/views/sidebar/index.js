import React from 'react';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {getPointers} from "../../store/reducers/pointer";
import {selectPointer} from "../../store/actions/pointer";

class Sidebar extends React.Component {

    render() {
        let pointers = this.props.pointers.map(item => {
            if(item.active) {
                return (
                    <li key={item.id} className={item.selected ? 'highlighted' : ''} onClick={() => this.props.dispatch(selectPointer(item.id))}>
                        <span>
                            {item.name}
                        </span>
                    </li>
                );
            }}
        );
        return (
            <div className="Sidebar">
                <ul>
                    {pointers}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pointers: getPointers(state)
});

const enhance = compose(connect(mapStateToProps));

export default enhance(Sidebar);

