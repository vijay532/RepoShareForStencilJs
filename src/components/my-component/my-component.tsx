import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @State() search: string;

  @State() items: { active: number; deaths: number; confirmed: number; statecode: string }[];

  componentWillLoad() {
    return fetch('https://data.covid19india.org/data.json')
      .then(res => res.json())
      .then(data => {
        this.items = data.statewise;
      })
      .catch(err => console.log(err));
  }

  updateVal = e => {
    this.search = (e.target as HTMLInputElement).value;
    console.log(this.search);
  };
  render() {
   
    const newItem = this.search
      ? this.items.filter(item => {
          return item.statecode === this.search;
        })
      : this.items;

    return (
      <div class="app">
        <div class="container">
          <input class="searchbar mb-15" type="search" onChange={e => this.updateVal(e)} placeholder="Search State....." />

          <div class="row">
            {
              // this.items!=null && typeof this.items!='undefined' && this.items.length > 0 &&

              newItem.map(content => (
                <div class="col-md-3 col-sm-6 col-4 mb-15">
                  <div class="card-container">
                    <p> Confirmed: {content.confirmed}</p>
                    <p> Active: {content.active} </p>
                    <p> Deaths : {content.deaths} </p>
                    <p>
                      {' '}
                      StateCode: <strong>{content.statecode}</strong>{' '}
                    </p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}
