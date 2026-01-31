import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    player;
    //keys;
    constructor ()
    {
        super('Game');
        
    }
    create ()
    {
        
        this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(512, 384, 'green');
        
        this.add.text(512, 200, 'Green Map', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);
        //player = this.physics.add.sprite(200, 350, 'catbeni');
        //player.setCollideWorldBounds(true);
        //var cursors;
        
        //this.keys = this.input.keyboard.addKeys("W,A,S,D");
        //cursors = this.input.keyboard.createCursorKeys();
        //console.log("keys",keys);
        

        EventBus.emit('current-scene-ready', this);
    }
   /* update ()
    {
        player = this.physics.add.sprite(200, 350, 'catbeni');
        player.setVelocity(0);
        if (keys.W.isDown) {
            // W key
            player.setVelocityY(-300);
        } else if (keys.D.isDown) {
            // D key 
            player.setVelocityX(300);
        } else if (keys.S.isDown) {
            // S key
            player.setVelocityY(300);
        } else if (keys.A.isDown) {
            // A key
            player.setVelocityX(-300);
        } 
    }
    */
    

    changeScene ()
    {
        this.scene.start('MainMenu');
    }
}
