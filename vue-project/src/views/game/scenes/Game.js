import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    
    constructor () {
        super('Game');

        this.playerLabel;

        this.user;

        EventBus.on('newPositions', (data) => {
            this.position.clear()
            for (let i = 0; i < data.length; i++) {
                this.position.set(data[i][0], data[i][1]);
            }
        });

        this.isChat = false;
        this.keyW;
        this.keyA;
        this.keyS;
        this.keyD;
        this.keyToggle;
        this.playerSprite;
        this.framesElapsed = 0;

        this.playerList = new Map();
        this.position = new Map();
    }
    create () {

        this.playerLabel = this.add.text(200, 400, this.user, {
            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);

        EventBus.on('user', (user) => {
            this.user = user;
            console.log("emitted username is recieved: ",user);
            this.playerLabel.setText(user.displayName);
        });

        // const keys = this.input.keyboard.addKey("W");
        this.keyW = this.input.keyboard.addKey("W");
        this.keyA = this.input.keyboard.addKey("A");
        this.keyS = this.input.keyboard.addKey("S");
        this.keyD = this.input.keyboard.addKey("D");
        this.keyToggle = this.input.keyboard.addKey("FORWARD_SLASH");
        

        this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(512, 384, 'green');
        
        this.add.text(512, 200, 'Green Map', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);
        //player = this.physics.add.sprite(200, 350, 'catbeni');
        this.playerSprite = this.add.image(200, 350, 'catbeni');
        //player.setCollideWorldBounds(true);
        var cursors;
        
        cursors = this.input.keyboard.createCursorKeys();
    
        EventBus.emit('current-scene-ready', this);

        EventBus.emit('listener-ready', true);
    }
    update () {
        if (this.framesElapsed % 60 == 0) {
            EventBus.emit("position", [this.playerSprite.x, this.playerSprite.y]);
            for (const [key, value] of this.position) {
                if (key != this.user.uid) {
                    //create an image for each player except yourself
                    if (this.playerList.get(key) == null) {
                        console.log(key," has no image in the map yet, creating one")
                        this.playerList.set(key, this.add.image(200, 200, 'catbeni'))
                    }
                    //Now they have an image, so we move them to the correct position
                    this.playerList.get(key).x = this.position.get(key).x
                    this.playerList.get(key).y = this.position.get(key).y
                    
                }
            }

            //console.log(this.position)
        }
        if (this.keyToggle.isDown) {
            this.isChat = !this.isChat;
            console.log("buh")
           
        }
        if (this.isChat) {
            return;
        }
        if (this.keyW.isDown) {
            // W key
            this.playerSprite.y -=5;
        }
        if (this.keyD.isDown) {
            // D key 
            this.playerSprite.x += 5;
        }
        if (this.keyS.isDown) {
            // S key
            this.playerSprite.y +=5;
        }
        if (this.keyA.isDown) {
            // A key
            this.playerSprite.x -=5;
        } 

        this.playerLabel.x = this.playerSprite.x;
        this.playerLabel.y = this.playerSprite.y-60;
        
        this.framesElapsed++;
    }
    

}
