class BarChart{
    constructor(domElement) {
        this.domElement = domElement;
        this.svgns = "http://www.w3.org/2000/svg"; 
        this.width = this.domElement.clientWidth;
        this.height = this.domElement.clientHeight;
        this.createSVG();
        this.location = domElement.getBoundingClientRect();
        console.log(this.location.top, this.location.left, this.location.bottom, this.location.right)
    }
    draw(data){
        this.data = data;
        this.drawBackground();
        this.drawBars();

        this.domElement.appendChild(this.svg);
    }
    createSVG(){
        this.svg = document.createElementNS(this.svgns, "svg");
        this.svg.setAttribute('style', 'border: 1px solid black');
        this.svg.setAttribute('width', this.width); //note: this.svg.width is readonly
        this.svg.setAttribute('height', this.height);
    }
    drawBackground(){
        const rect = document.createElementNS(this.svgns, 'rect');
        rect.setAttribute('x', 0);
        rect.setAttribute('y', 0);
        rect.setAttribute('height', this.height);
        rect.setAttribute('width', this.width);
        rect.style.fill = 'WhiteSmoke';
        this.svg.appendChild(rect);
    }
    drawBars(){
        const barWidth = this.width / this.data.length;

        const mp = this.data.map(x => x[1])

        const mx = Math.max(...mp)
        const mn = Math.min(...mp)
        const maxMultiplier = 0.8
        const minMultiplier = 0.5
        const top = this.height * maxMultiplier
        const bottom = this.height * minMultiplier
        const delta = top - bottom

        const f = this.height / mx ;

        for(let i=0; i<this.data.length; i++){

            const label = this.data[i][0];
            const value = this.data[i][1];

            const barHeight = this.height * minMultiplier + delta * ((value - mn) * 100/(mx - mn)/100)
            const barY = this.height - barHeight;
            const barX = i * barWidth + barWidth/4;

            const bar = document.createElementNS(this.svgns, 'rect');   
            bar.setAttribute('class','bar');
            bar.setAttribute('x', barX);
            bar.setAttribute('y', barY);
            bar.setAttribute('height', barHeight);
            bar.setAttribute('width', barWidth/2);

            bar.setAttribute("fill", '#db4437');
            bar.setAttribute("stroke-width", 2);
            bar.setAttribute("stroke", "black");
            this.svg.appendChild(bar);

            const text = document.createElementNS(this.svgns, 'text');
            text.appendChild(document.createTextNode(label));
            text.setAttribute('x', barX + barWidth/4);
            text.setAttribute('y', barY - 10);
            text.setAttribute('text-anchor', 'middle');
            this.svg.appendChild(text);

            // afisam tooltipul cand mouseul este peste o bara
            bar.addEventListener('mouseover', (e) =>{
                document.getElementById('year').innerHTML = "An: " + label;
                document.getElementById('value').innerHTML = "Valoare: " + value;
                toolTip.style.visibility = "visible";

                const left = bar.getBoundingClientRect().left
                const right = bar.getBoundingClientRect().right
                toolTip.style.left = `${left + (right - left) / 2 - toolTip.offsetWidth / 2}px`;
                toolTip.style.top = `${e.pageY - toolTip.offsetHeight}px`;
            })
            
            // ascundem tooltipul cand mouseul paraseste bara
            bar.addEventListener('mouseleave', (e) =>{
                toolTip.style.visibility = "hidden";
            })
        }
    }
}
