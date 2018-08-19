import * as DCL from 'metaverse-api'
import {Vector3Component} from "metaverse-api";

import {ContractFactory, RequestManager} from 'eth-connect';

const jsonInterface = require('./abi.json')

// This is an interface, you can use it to enforce the types of your state
export interface IState {
    isDoorClosed: boolean;
    rentMeText: string;
}


const Tile = (props: { position: Vector3Component }) => {
    // const colores = ["#1dccc7", "#ffce00", "#9076ff", "#fe3e3e", "#3efe94", "#3d30ec", "#6699cc"];
    // const index0 = Math.floor(Math.random() * colores.length);

    return (<box
        id="caja"
        position={props.position}
        scale={{x: 2, y: 0.2, z: 2}}
        color="#228B22"
    />)

}

export default class HouseScene extends DCL.ScriptableScene<any, IState> {
    // This is your initial state and it respects the given IState interface
    state = {
        isDoorClosed: false,
        rentMeText: "Rent me!"

    }


    async sceneDidMount() {

        const provider = await this.getEthereumProvider();
        const requestManager = new RequestManager(provider)

        const factory = new ContractFactory(requestManager, jsonInterface)
        const instance: any = await factory.at('0x9d2cca961249716f0a1dd805f7bc9e09a05e9c5c')

        this.eventSubscriber.on('door_click', () => {


            // setState() will update the state and trigger an update, causing the scene to rerender
            this.setState({isDoorClosed: !this.state.isDoorClosed})
        })

        this.subscribeTo('click', async () => {
            // setState() will update the state and trigger an update, causing the scene to rerender
            try {
                const address = '0xaF6F0317B2B7d4eb4D1A94403c94Bf4F091645A1'
                const e: any = await instance.payRent({from: address, value: 20})
                console.log(e)
            } catch (e) {
                console.log(e)
            }
            console.log("rent Click")

            this.setState({rentMeText: "Gone"})
        })
    }

    async render() {

        const tiles: any[] = [];

        [-6, -5, -4, -3, -2, -1, 0, 1, 2].forEach(x => {
            [22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6].forEach(z => {
                tiles.push(<Tile position={{x: x + 2, y: -0.1, z: z + 2}}/>)
            })
        })

        const doorRotation = {
            x: 0,
            y: this.state.isDoorClosed ? 0 : 90,
            z: 0
        }

        return (
            <scene position={{x: 5, y: 0, z: 5}} scale={0.999}>
                {tiles}
                <entity rotation={doorRotation} transition={{rotation: {duration: 1000, timing: 'ease-in'}}}>
                    <box id="door" scale={{x: 1, y: 2, z: 0.05}} position={{x: 0.5, y: 1, z: 0}} color="#00FF00"/>
                </entity>
                {/*<box position={{x: 2, y: 1, z: 0}} scale={{x: 2, y: 2, z: 0.05}} color="#0000FF"/>*/}
                {/*<box position={{x: -1, y: 1, z: 0}} scale={{x: 2, y: 2, z: 0.05}} color="#0000FF"/>*/}

                <gltf-model
                    position={{x: 0, y: -7, z: 0}}
                    scale={{x: 5, y: 5, z: 5}}
                    src="models/model.gltf"
                />

                <gltf-model
                    position={{x: 0, y: -7, z: 0}}
                    scale={{x: 5, y: 5, z: 5}}
                    src="models/Inn.gltf"
                />

                <gltf-model
                    position={{x: -5, y: 0, z: 23}}
                    scale={{x: 0.5, y: 0.5, z: 0.5}}
                    src="models/ElmTree.gltf"
                />

                <gltf-model
                    position={{x: -3, y: 0, z: 23}}
                    scale={{x: 0.35, y: 0.35, z: 0.35}}
                    src="models/BighornSheep.gltf"
                />

                <gltf-model
                    position={{x: -5, y: 2, z: 20}}
                    scale={{x: 1, y: 1, z: 1}}
                    src="models/CUPIC_WHEELBARROW.gltf"
                />

                <gltf-model
                    position={{x: -5, y: 0, z: 20}}
                    scale={{x: 0.5, y: 0.5, z: 0.5}}
                    src="models/ElmTree.gltf"
                />

                <gltf-model
                    //todo add rotation
                    position={{x: -5, y: 10, z: 20}}
                    scale={{x: 1, y: 1, z: 1}}
                    src="models/Rainbow_01.gltf"
                />


                {/*<gltf-model*/}
                {/*position={{x: 3.5, y: 0, z: 20}}*/}
                {/*scale={{x: 0.5, y: 0.5, z: 0.5}}*/}
                {/*src="models/Funicular_01.gltf"*/}
                {/*/>*/}

                <gltf-model
                    position={{x: 3.5, y: 0, z: 23}}
                    scale={{x: 0.5, y: 0.5, z: 0.5}}
                    src="models/Diner.gltf"
                />

                <gltf-model
                    position={{x: 3.5, y: 1.0, z: 23}}
                    scale={{x: 0.025, y: 0.025, z: 0.025}}
                    src="models/Hamburger_01.gltf"
                />



                {/*<gltf-model*/}
                {/*// position={{x: 10, y: -18, z: 80}}*/}
                {/*// scale={{x: 20, y: 15, z: 20}}*/}
                {/*src="models/cow.gltf"*/}
                {/*/>*/}

                <material id="transparent" alpha={1}/>
                <box scale={{x: 4, y: 1, z: 0.05}} position={{x: -2, y: 3.8, z: 1.5}} color="#D3D3D3"/>
                <text
                    height={10}
                    opacity={1}
                    position={{x: -2, y: 3.8, z: 1}}
                    scale={{x: 5, y: 5, z: 5}}
                    value={this.state.rentMeText} fontSize={90} color="white"></text>
                <box id="rent" material="#transparent" scale={{x: 4, y: 1, z: 1}}
                     position={{x: -2, y: 4, z: 1.5}}/>


            </scene>
        )
    }
}
