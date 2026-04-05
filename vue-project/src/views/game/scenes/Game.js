import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    
    constructor () {
        super('Game');

        this.playerLabel;

        this.user;

        this.isChat = false;
        this.keyW;
        this.keyA;
        this.keyS;
        this.keyD;
        this.keyToggle;
        this.playerSprite;
        this.framesElapsed = 0;

        this.players = new Map();
        this.position = new Map();
        this.labels = new Map();
        this.usernames = new Map();
    }
    create () {

        EventBus.on('user', (user) => {
            this.user = user[0];
            this.playerLabel.setText(user[1]);
            console.log("set text")
            console.log(user[1])
        });

        EventBus.on('newpos', (data) => {
            this.position.clear()
            let newdata = Object.entries(data)
            for (let i = 0; i < newdata.length; i++) {
                this.position.set(newdata[i][0], newdata[i][1]);
            }
        });

        EventBus.on('sendusername', (data) => {
            this.usernames.set(data[0], data[1])
            //console.log("recieved: ", data[0], data[1])
        })
        

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

        console.log("added label")
        this.playerLabel = this.add.text(200, 400, "", {
            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);
    
        EventBus.emit('current-scene-ready', this);

        EventBus.emit('listener-ready', true);
    }
    update () {
        if (this.framesElapsed % 15 == 0 && this.user != null) {
            EventBus.emit("position", [this.playerSprite.x, this.playerSprite.y]);
            for (const [key, value] of this.position) {
                if (key != this.user.uid) {
                    //create an image for each player except yourself
                    
                    if (this.players.get(key) == null) {
                        //Player is not in list yet, make new image
                        this.players.set(key, this.add.image(value.x, value.y, 'catbeni'));
                    } else {
                        //player image exists, move instead
                        this.players.get(key).x = value.x
                        this.players.get(key).y = value.y
                    }
                    
                    if (this.usernames.get(key) == null) {
                        EventBus.emit('getusername', key)
                    }

                    if (this.labels.get(key) == null && this.usernames.get(key) != null) {
                        //Player label is not in list yet, make new image
                        this.labels.set(key, this.add.text(value.x, value.y, this.usernames.get(key), {
                            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
                            stroke: '#000000', strokeThickness: 8,
                            align: 'center'
                        }).setDepth(100).setOrigin(0.5))
                    } else if (this.labels.get(key) != null && this.usernames.get(key) != null) {
                        //player image exists, move instead
                        this.labels.get(key).x = value.x
                        this.labels.get(key).y = value.y-60
                    }
                }
            }

            for (const [key, value] of this.players) {
                if (this.position.get(key) == null) {
                    console.log("player ", key, " disconnected")
                    this.players.get(key).destroy()
                    this.players.delete(key)
                }
            }

            for (const [key, value] of this.labels) {
                if (this.position.get(key) == null) {
                    this.labels.get(key).destroy()
                    this.labels.delete(key)
                }
            }

            //console.log(this.position)
            //console.log(this.usernames)
            //console.log(this.user)
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
