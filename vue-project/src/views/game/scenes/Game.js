import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    
    
    constructor ()
    {
        super('Game');
        this.isChat = false;
        this.keyA
        this.keyS
        this.keyD
        this.keyW
        this.keyToggle;
        this.keyENTER
        this.keyESC
        this.player;
        this.cursors;
        this.sturing;
    }
    create ()
    {
        
        this.keyENTER = this.input.keyboard.addKey('ENTER',false)
        this.keyESC = this.input.keyboard.addKey('ESC',false)
        this.keyToggle = this.input.keyboard.addKey('FORWARD_SLASH',false)
        this.keyA = this.input.keyboard.addKey('A',false)
        this.keyS = this.input.keyboard.addKey('S', false)
        this.keyD = this.input.keyboard.addKey('D', false)
        this.keyW = this.input.keyboard.addKey('W', false)
        this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(512, 384, 'green');
        
        /*this.add.text(512, 200, 'Green Map', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);
        */
        if (1 == 1) {
            this.sturing = 'catbeni';
        }
        this.player = this.physics.add.sprite(200, 350, this.sturing);
        this.player.setCollideWorldBounds(true);
        
        
        this.cursors = this.input.keyboard.createCursorKeys();
        const emoButton = this.add.text(100, 100, 'Become Emo', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.changeCharacter('emo'));
       
        const fluffyButton = this.add.text(100, 200, 'Become fluffy', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.changeCharacter('fluffy'));
        
        const uuhButton = this.add.text(100, 300, 'Become uuh', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.changeCharacter('uuh'));

        const OrangeButton = this.add.text(100, 400, 'Lose Brain', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.changeCharacter('orange'));

        const l3Button = this.add.text(400, 300, 'Become :3', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.changeCharacter('l3'));

        const ChineseButton = this.add.text(400, 400, 'Become CC!', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.changeCharacter('CC'));

        const CatbeniButton = this.add.text(400, 500, 'Become Catbeni!', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.changeCharacter('catbeni'));
        EventBus.emit('current-scene-ready', this);
    }
    update ()
    {   
        if (this.keyESC.isDown || this.keyENTER.isDown) {
            this.isChat = false;
        }
        if (this.isChat) {
            return;
        }
        if (this.keyToggle.isDown) {
            this.isChat = true;
            
        }
        
        if (this.keyA.isDown) {
            this.player.x -= 5;
        }
        if (this.keyS.isDown) {
            this.player.y += 5;
        }
        if (this.keyD.isDown) {
            this.player.x += 5;
        }
        if (this.keyW.isDown) {
            this.player.y -= 5;
        }
       
        
               
    }
    changeCharacter(char) {
        this.sturing = char
        this.player.destroy()
        this.player = this.physics.add.sprite(this.player.x, this.player.y, this.sturing);
    }
}
