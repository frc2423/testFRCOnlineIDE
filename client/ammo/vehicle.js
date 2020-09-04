

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
    }

    render() {
        return html`
           
        `;
    }
}

customElements.define('frc-ammo-vehicle', AmmoVehicle);   