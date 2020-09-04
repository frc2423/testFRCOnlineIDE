

class AmmoVehicle extends LitElement {

    static get styles() {
        return css`
            :host {
                display: block;
            }
        `;
    }

    // static get properties() {
    //     return {
    //         message: { type: String }
    //     }
    // }
    
    constructor() {
        super();
        this.Ammo = null;
    }

    async firstUpdated() {
        this.Ammo = await Ammo();

        // Detects webgl
        if ( ! Detector.webgl ) {
            Detector.addGetWebGLMessage();
            document.getElementById( 'container' ).innerHTML = "";
        }

        // - Global variables -
        var DISABLE_DEACTIVATION = 4;
        var TRANSFORM_AUX = new Ammo.btTransform();
        var ZERO_QUATERNION = new THREE.Quaternion(0, 0, 0, 1);

        // Graphics variables
        var container, stats, speedometer;
        var camera, controls, scene, renderer;
        var terrainMesh, texture;
        var clock = new THREE.Clock();
        var materialDynamic, materialStatic, materialInteractive;

        // Physics variables
        var collisionConfiguration;
        var dispatcher;
        var broadphase;
        var solver;
        var physicsWorld;

        var syncList = [];
        var time = 0;
        var objectTimePeriod = 3;
        var timeNextSpawn = time + objectTimePeriod;
        var maxNumObjects = 30;

        // Keybord actions
        var actions = {};
        var keysActions = {
            "KeyW":'acceleration',
            "KeyS":'braking',
            "KeyA":'left',
            "KeyD":'right'
        };
    }

    render() {
        return html`
           <div id="container"><br /><br /><br /><br /><br />Loading...</div>
            <div id="speedometer">0.0 km/h</div>
            <div id="info">Ammo.js Raycast vehicle demo<br>Press W,A,S,D to move.</div>

        `;
    }
}

customElements.define('frc-ammo-vehicle', AmmoVehicle);   