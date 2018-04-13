var App = require('../../context/events');
var React = require('react');

var Test = React.createClass({
  firstNameChanged(value){
    window.BUS.trigger(App.events.test.firstNameChangedTest, [value]);
  },
  render:function(){
    return (
      // <div className="test-div">
      //   <div className="login-form-test"> 
      //       <p className="title">SIGN UP HERE!</p>
      //       <hr/>
      //       <input type="text" className="names" value = {this.props.details.get('firstName')}
      //             onChange={(e) => this.firstNameChanged(e.target.value)} placeholder="First Name"/>
      //       <input type="text" className="names" value = {this.props.details.get('lastName')}
      //             /*onChange={(e) => this.lastNameChanged(e.target.value)}*/ placeholder="Last Name"/>
      //       <input type="text" className="input-fields" placeholder="Username"/>
      //       <input type="password" className="names" placeholder="Password"/>
      //       <input type="password" className="names" placeholder="Confirm Password"/>
      //       <input type="number" className="input-fields" placeholder="Phone Number"/>
      //       <input type="email" className="input-fields" placeholder="Email Id"/>
      //       <hr/>
      //       <input type="button" className="submit-button" value="SIGN UP"/>
      //   </div>
      // </div>
      <div>
        <div className="appbar">
          <span className="appbar-name">Test Page</span>
          <div className="appbar-info">
            <span>Hi Welcome</span>
            <img src="../images/onlineshop.png" className="image-thumbnail" alt="Name"/>
          </div>
        </div>
        <div className="left-block">
          <div className="left-menu">News and Publications</div>
          <div className="left-menu">Employee Resources</div>
          <div className="left-menu">Departments</div>
          <div className="left-menu">Our Company</div>
        </div>
        <div className="right-block">
          <div className="search-block">
            <span className="title-size">Employee Directory</span>
            <div className="search-area">
              <input type="text" placeholder="Search....." />
            </div>
          </div>
          <div className="users-list">
            <div className="user">
              <div className="user-name">
                <div className="user-name-left">
                  <img src="../images/onlineshop.png" className="user-image" alt="Name"/>
                </div>
                <div className="user-name-right">
                  <span className="name-style line-clamp">Marion Farrelllllllllllllllllllllllllllllllllllllllllll</span><br/>
                  <span className="title-style">UX Designer</span><br/><br/>
                  <span>MARKETING</span>
                </div>
              </div>
              <div className="user-info">
                <table>
                  <tr>
                    <td><span className="fa fa-envelope"></span></td>
                    <td className="line-clamp">abc@gmail.collllllllllllllllllllllllllllllllllllllllllllllllllll</td>
                  </tr>
                  <tr>
                    <td><span className="fa fa-mobile"></span></td>
                    <td className="line-clamp">Mob: 123-245-6452</td>
                  </tr>
                  <tr>
                    <td><span className='fa fa-phone'></span></td>
                    <td className="line-clamp">Tel: 152-545-5454</td>
                  </tr>
                  <tr>
                    <td><span className='fa fa-phone'></span></td>
                    <td className="line-clamp">Tel: 152-545-5454</td>
                  </tr>
                  <tr>
                    <td><span className='fa fa-phone'></span></td>
                    <td className="line-clamp">Tel: 152-545-5454</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="user">
              <div className="user-name">
                <div className="user-name-left">
                  <img src="../images/onlineshop.png" className="user-image" alt="Name"/>
                </div>
                <div className="user-name-right">
                  <span className="name-style">Marion Farrel</span><br/>
                  <span className="title-style">UX Designer</span><br/><br/>
                  <span>MARKETING</span>
                </div>
              </div>
              <div className="user-info">
                <div className="user-info-row">
                  <div className = "user-info-cell">
                    <span className="fa fa-envelope"></span>
                  </div>
                  <div cl32pxassName = "user-info-cell line-clamp">
                    abc@gmail.com
                  </div>
                </div>
                
                <div className="user-info-row">
                  <div className = "user-info-cell">
                    <span className="fa fa-mobile"></span>
                  </div>
                  <div className = "user-info-cell line-clamp">
                    Mob:123-245-6452
                  </div>
                </div>
                <div className="user-info-row">
                  <div className = "user-info-cell">
                    <span className="fa fa-phone"></span>
                  </div>
                  <div className = "user-info-cell line-clamp">
                    Tel: 152-545-5454dfhhhhhhhhhhhhhhhhhhhhh
                  </div>
                </div>
                {/* <table>
                  <tr>
                    <td><span className="fa fa-envelope"></span></td>
                    <td>abc@gmail.com</td>
                  </tr>
                  <tr>
                    <td><span className="fa fa-mobile"></span></td>
                    <td>Mob: 123-245-6452</td>
                  </tr>
                  <tr>
                    <td><span className='fa fa-phone'></span></td>
                    <td>Tel: 152-545-5454</td>
                  </tr>
                </table> */}
              </div>
            </div>
            
            <div className="user">
              <div className="user-name">
                <div className="user-name-left">
                  <img src="../images/onlineshop.png" className="user-image" alt="Name"/>
                </div>
                <div className="user-name-right">
                  <span className="name-style">Marion Farrel</span><br/>
                  <span className="title-style">UX Designer</span><br/><br/>
                  <span>MARKETING</span>
                </div>
              </div>
              <div className="user-info">
                <table>
                  <tr>
                    <td><span className="fa fa-envelope"></span></td>
                    <td>abc@gmail.com</td>
                  </tr>
                  <tr>
                    <td><span className="fa fa-mobile"></span></td>
                    <td>Mob: 123-245-6452</td>
                  </tr>
                  <tr>
                    <td><span className='fa fa-phone'></span></td>
                    <td>Tel: 152-545-5454</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="user">
              <div className="user-name">
                <div className="user-name-left">
                  <img src="../images/onlineshop.png" className="user-image" alt="Name"/>
                </div>
                <div className="user-name-right">
                  <span className="name-style">Marion Farrel</span><br/>
                  <span className="title-style">UX Designer</span><br/><br/>
                  <span>MARKETING</span>
                </div>
              </div>
              <div className="user-info">
                <table>
                  <tr>
                    <td><span className="fa fa-envelope"></span></td>
                    <td>abc@gmail.com</td>
                  </tr>
                  <tr>
                    <td><span className="fa fa-mobile"></span></td>
                    <td>Mob: 123-245-6452</td>
                  </tr>
                  <tr>
                    <td><span className='fa fa-phone'></span></td>
                    <td>Tel: 152-545-5454</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="user">
              <div className="user-name">
                <div className="user-name-left">
                  <img src="../images/onlineshop.png" className="user-image" alt="Name"/>
                </div>
                <div className="user-name-right">
                  <span className="name-style">Marion Farrel</span><br/>
                  <span className="title-style">UX Designer</span><br/><br/>
                  <span>MARKETING</span>
                </div>
              </div>
              <div className="user-info">
                <table>
                  <tr>
                    <td><span className="fa fa-envelope"></span></td>
                    <td>abc@gmail.com</td>
                  </tr>
                  <tr>
                    <td><span className="fa fa-mobile"></span></td>
                    <td>Mob: 123-245-6452</td>
                  </tr>
                  <tr>
                    <td><span className='fa fa-phone'></span></td>
                    <td>Tel: 152-545-5454</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="user">
              <div className="user-name">
                <div className="user-name-left">
                  <img src="../images/onlineshop.png" className="user-image" alt="Name"/>
                </div>
                <div className="user-name-right">
                  <span className="name-style">Marion Farrel</span><br/>
                  <span className="title-style">UX Designer</span><br/><br/>
                  <span>MARKETING</span>
                </div>
              </div>
              <div className="user-info">
                <table>
                  <tr>
                    <td><span className="fa fa-envelope"></span></td>
                    <td>abc@gmail.com</td>
                  </tr>
                  <tr>
                    <td><span className="fa fa-mobile"></span></td>
                    <td>Mob: 123-245-6452</td>
                  </tr>
                  <tr>
                    <td><span className='fa fa-phone'></span></td>
                    <td>Tel: 152-545-5454</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="user">
              <div className="user-name">
                <div className="user-name-left">
                  <img src="../images/onlineshop.png" className="user-image" alt="Name"/>
                </div>
                <div className="user-name-right">
                  <span className="name-style">Marion Farrel</span><br/>
                  <span className="title-style">UX Designer</span><br/><br/>
                  <span>MARKETING</span>
                </div>
              </div>
              <div className="user-info">
                <table>
                  <tr>
                    <td><span className="fa fa-envelope"></span></td>
                    <td>abc@gmail.com</td>
                  </tr>
                  <tr>
                    <td><span className="fa fa-mobile"></span></td>
                    <td>Mob: 123-245-6452</td>
                  </tr>
                  <tr>
                    <td><span className='fa fa-phone'></span></td>
                    <td>Tel: 152-545-5454</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="user">
              <div className="user-name">
                <div className="user-name-left">
                  <img src="../images/onlineshop.png" className="user-image" alt="Name"/>
                </div>
                <div className="user-name-right">
                  <span className="name-style">Marion Farrel</span><br/>
                  <span className="title-style">UX Designer</span><br/><br/>
                  <span>MARKETING</span>
                </div>
              </div>
              <div className="user-info">
                <table>
                  <tr>
                    <td><span className="fa fa-envelope"></span></td>
                    <td>abc@gmail.com</td>
                  </tr>
                  <tr>
                    <td><span className="fa fa-mobile"></span></td>
                    <td>Mob: 123-245-6452</td>
                  </tr>
                  <tr>
                    <td><span className='fa fa-phone'></span></td>
                    <td>Tel: 152-545-5454</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="user">
              <div className="user-name">
                <div className="user-name-left">
                  <img src="../images/onlineshop.png" className="user-image" alt="Name"/>
                </div>
                <div className="user-name-right">
                  <span className="name-style">Marion Farrel</span><br/>
                  <span className="title-style">UX Designer</span><br/><br/>
                  <span>MARKETING</span>
                </div>
              </div>
              <div className="user-info">
                <table>
                  <tr>
                    <td><span className="fa fa-envelope"></span></td>
                    <td>abc@gmail.com</td>
                  </tr>
                  <tr>
                    <td><span className="fa fa-mobile"></span></td>
                    <td>Mob: 123-245-6452</td>
                  </tr>
                  <tr>
                    <td><span className='fa fa-phone'></span></td>
                    <td>Tel: 152-545-5454</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="user">
              <div className="user-name">
                <div className="user-name-left">
                  <img src="../images/onlineshop.png" className="user-image" alt="Name"/>
                </div>
                <div className="user-name-right">
                  <span className="name-style">Marion Farrel</span><br/>
                  <span className="title-style">UX Designer</span><br/><br/>
                  <span>MARKETING</span>
                </div>
              </div>
              <div className="user-info">
                <table>
                  <tr>
                    <td><span className="fa fa-envelope"></span></td>
                    <td>abc@gmail.com</td>
                  </tr>
                  <tr>
                    <td><span className="fa fa-mobile"></span></td>
                    <td>Mob: 123-245-6452</td>
                  </tr>
                  <tr>
                    <td><span className='fa fa-phone'></span></td>
                    <td>Tel: 152-545-5454</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="user">
              <div className="user-name">
                <div className="user-name-left">
                  <img src="../images/onlineshop.png" className="user-image" alt="Name"/>
                </div>
                <div className="user-name-right">
                  <span className="name-style">Marion Farrel</span><br/>
                  <span className="title-style">UX Designer</span><br/><br/>
                  <span>MARKETING</span>
                </div>
              </div>
              <div className="user-info">
                <table>
                  <tr>
                    <td><span className="fa fa-envelope"></span></td>
                    <td>abc@gmail.com</td>
                  </tr>
                  <tr>
                    <td><span className="fa fa-mobile"></span></td>
                    <td>Mob: 123-245-6452</td>
                  </tr>
                  <tr>
                    <td><span className='fa fa-phone'></span></td>
                    <td>Tel: 152-545-5454</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="user">
              <div className="user-name">
                <div className="user-name-left">
                  <img src="../images/onlineshop.png" className="user-image" alt="Name"/>
                </div>
                <div className="user-name-right">
                  <span className="name-style">Marion Farrel</span><br/>
                  <span className="title-style">UX Designer</span><br/><br/>
                  <span>MARKETING</span>
                </div>
              </div>
              <div className="user-info">
                <table>
                  <tr>
                    <td><span className="fa fa-envelope"></span></td>
                    <td>abc@gmail.com</td>
                  </tr>
                  <tr>
                    <td><span className="fa fa-mobile"></span></td>
                    <td>Mob: 123-245-6452</td>
                  </tr>
                  <tr>
                    <td><span className='fa fa-phone'></span></td>
                    <td>Tel: 152-545-5454</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="user">
              <div className="user-name">
                <div className="user-name-left">
                  <img src="../images/onlineshop.png" className="user-image" alt="Name"/>
                </div>
                <div className="user-name-right">
                  <span className="name-style">Marion Farrel</span><br/>
                  <span className="title-style">UX Designer</span><br/><br/>
                  <span>MARKETING</span>
                </div>
              </div>
              <div className="user-info">
                <table>
                  <tr>
                    <td><span className="fa fa-envelope"></span></td>
                    <td>abc@gmail.com</td>
                  </tr>
                  <tr>
                    <td><span className="fa fa-mobile"></span></td>
                    <td>Mob: 123-245-6452</td>
                  </tr>
                  <tr>
                    <td><span className='fa fa-phone'></span></td>
                    <td>Tel: 152-545-5454</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
});
module.exports = Test;