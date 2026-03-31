import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
        this.load.image('catbeni', require('@/assets/character.png'));
        this.load.image('emo', require('@/assets/emo.png'));
        this.load.image('uuh', require('@/assets/uuh.png'));
        this.load.image('l3', require('@/assets/l3.png'));
        this.load.image('orange', require('@/assets/Orange.png'));
        this.load.image('fluffy', require('@/assets/Fluffy.png'));
        this.load.image('CC', require('@/assets/Chinesecat.png'));
        this.load.image('green', require('@/assets/GreenMap.png'));
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
