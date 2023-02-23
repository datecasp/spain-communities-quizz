import { Control } from 'ol/control';

export class EduGamingControl extends Control {
  imgMenuIcon: string = '././src/assets/rubik.png';
  imgMenuIconHover: string = '././assets/rubik-hover.png';
  imgSrc: string = this.imgMenuIcon;

  /**
   * @param {Object} [opt_options] Control options.
   */
  constructor(opt_options : any) {
    const options = opt_options || {};
    const button = document.createElement('button');
    const img = document.createElement('img');
    img.src ='././assets/rubik.png';
    img.height = 64;
    img.addEventListener("mouseover", function() { img.src = '././assets/rubik-hover.png'; img.className='container mat-elevation-z12'; img.height = 80;});
    img.addEventListener("mouseout", function() { img.src = '././assets/rubik.png'; img.className='container mat-elevation-z8'; img.height = 64});
    img.className = "container mat-elevation-z8";

    button.appendChild(img);

    const element = document.createElement('div');
    element.className = 'EduGamingControl';
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    button.addEventListener('click', this.handleButtonEduGamingClick.bind(this));
  }

  handleButtonEduGamingClick(event: any) {
    console.log(event);
  }
}
