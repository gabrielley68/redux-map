import React from 'react';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {Application, Texture, Sprite} from 'pixi.js';
import {editPointer, newPointer} from "../../store/actions/pointer";
import {getPointers, isEditing} from "../../store/reducers/pointer";
import {TweenMax, Elastic} from 'gsap';
import Popin from "../popin";

class Map extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.app = new Application({backgroundColor: 0x1099bb});
        this.refs.container.appendChild(this.app.view);

        let textureBackground = Texture.from('img/french-map.png');
        const background = new Sprite(textureBackground);
        background.interactive = true;
        background.buttonMode = true;
        background.on('pointerdown', e =>  this.props.dispatch(newPointer(e.data.global.x, e.data.global.y)));
        this.app.stage.addChild(background);

        this.sprites = {};

        window.addEventListener('resize', this.onResize.bind(this));
        this.onResize();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.pointers !== this.props.pointers) {
            this.props.pointers.forEach(item => {
                if (item.active && !this.sprites[item.id]) {
                    let newSprite = new Sprite(Texture.from('img/marker.png'));
                    newSprite.x = item.x;
                    newSprite.y = item.y;
                    newSprite.anchor.set(0.5,0.5);
                    newSprite.interactive = true;
                    newSprite.on('pointerdown',  () => this.props.dispatch(editPointer(item.id)));
                    this.app.stage.addChild(newSprite);
                    this.sprites[item.id] = newSprite;
                }

                if(item.selected) {
                    TweenMax.to(this.sprites[item.id].scale, 2, {
                        ease: Elastic.easeOut.config(1,0.3),
                        x: 1.5,
                        y: 1.5
                    });
                }
                else {
                    TweenMax.to(this.sprites[item.id].scale, 2, {
                        ease: Elastic.easeOut.config(1,0.3),
                        x: 1,
                        y: 1
                    });
                }

                if(!item.active){
                    this.app.stage.removeChild(this.sprites[item.id]);
                }
            });
        }

    }

    onResize(){
        const {offsetWidth: w, offsetHeight : h} = this.refs.container;
        this.app.renderer.resize(w, h);
    }

    render() {
        return (
            <div className="Map" ref={"container"}>
                {this.props.editing && <Popin/>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pointers: getPointers(state),
    editing: isEditing(state)
});

const enhance = compose(connect(mapStateToProps));

export default enhance(Map);

