class Arc {
    constructor(r, f, h) {
        this.r = r;
        this.f = f;
        this.angle = 0;
        this.angleVelocity = 1;
        this.length = 180;

        this.h = h;
        this.s = 255;
        this.b = 255;

        this.xpos = 0;
        this.ypos = 0;
    }

    update(xpos, ypos) {
        if(this.collision(0, 40)) {
            this.sw = 2;
            this.b = 0;
        } else {
            this.sw  = 1;
            if(this.b < 255) {
                this.b += 20;
            }
        }
        this.xpos = xpos;
        this.ypos = ypos;
        this.angle += this.angleVelocity;
    }

    display() {
        noFill();
        strokeWeight(this.sw);
        stroke(this.h, this.s, this.b);
        arc(this.xpos, this.ypos, this.r*2, this.r*2,
            (this.angle * this.f) - this.length,
            (this.angle * this.f));
        this.x = this.r * cos(this.angle * this.f);
        this.y = this.r * sin(this.angle * this.f);
        fill(this.h, this.s, this.b);
        ellipse(this.x, this.y, 1, 1);
    }

    collision(loc, buffer) {
        if( (this.angle * this.f) % 360 >= loc - buffer
            && (this.angle * this.f) % 360 <= loc + buffer) {
            return true;
        } else {
            return false;
        }
    }
}