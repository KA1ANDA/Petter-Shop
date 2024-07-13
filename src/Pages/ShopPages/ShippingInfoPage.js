import React, { memo } from 'react';
import shippingBg from './../../Components/shopComponents/Photos/shippingBg.png'
import Information from './../../Components/Information'
import OurBenefits from '../../Components/shopComponents/OurBenefits';




const ShippingInfoPage = memo(() => {

 

  return(
    <div className=' '>
       <Information
       name='Shipping Information'
       description='Tristique nulla aliquet enim tortor at auctor urna nunc. Massa enim nec dui nunc mattis enim ut tellus'
       image={shippingBg}/>
       
        <div className=' text-h5 font-normal font-lato   flex flex-col w-full px-[15px] 2xl:p-0  xl:w-[950px] m-auto gap-[20px] mt-[50px]  '>

          <div className=' flex flex-col gap-[20px]'>
            <div className=' text-h3 md:text-h2 font-extrabold font-nunito text-start  md:text-center'>Shipping Charges & Times</div>
            <div>Consectetur adipiscing elit ut aliquam. Urna porttitor rhoncus dolor purus non. Donec ac odio tempor orci dapibus ultrices in iaculis nunc. In massa tempor nec feugiat. Aliquam sem fringilla ut morbi tincidunt augue interdum velit. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Porttitor eget dolor morbi non arcu risus quis. Pulvinar elementum integer enim neque volutpat ac. Purus ut faucibus pulvinar elementum integer. Leo a diam sollicitudin tempor id eu nisl nunc mi. Vitae congue eu consequat ac felis donec</div>
            <ul className=' list-disc marker:text-primary gap-[15px] flex flex-col'>
              <li>Massa massa ultricies mi quis hendrerit</li>
              <li>Facilisi cras fermentum odio eu feugiat</li>
              <li>Placerat vestibulum lectus mauris ultrices eros</li>
              <li>Nullam non nisi est sit amet facilisis</li>
            </ul>
          </div>

          <div className=' flex flex-col gap-[20px]'>
            <div  className=' text-h3 font-extrabold font-nunito text-start  md:text-center'>Everyday Free Shipping on $35</div>
            <div>Amet justo donec enim diam vulputate ut. Sagittis eu volutpat odio facilisis. Ut venenatis tellus in metus vulputate. Nunc congue nisi vitae suscipit. Tempus urna et pharetra pharetra massa massa ultricies mi quis. Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla.</div>
            <ul className=' list-disc marker:text-primary gap-[15px] flex flex-col'>
              <li>Nec ullamcorper sit amet risus nullam eget felis eget nunc. Non diam phasellus vestibulum lorem sed. Id interdum velit laoreet id. Malesuada fames ac turpis egestas maecenas.Facilisi cras fermentum odio eu feugiat</li>
              <li>Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Sit amet dictum sit amet justo. Tristique nulla aliquet enim tortor at auctor urna nunc.</li>
              <li>Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend.</li>
            </ul>
          </div>

          <div className=' flex flex-col gap-[20px]'>
            <div  className=' text-h3 font-extrabold font-nunito text-start  md:text-center'>Shipping Rates</div>
            <div>Sit amet volutpat consequat mauris nunc congue nisi vitae. Sed viverra tellus in hac. Vitae elementum curabitur vitae nunc sed velit dignissim sodales. Mattis enim ut tellus elementum sagittis vitae et leo. Sem integer vitae justo eget. Vitae auctor eu augue ut. Scelerisque viverra mauris in aliquam. </div>
          </div>

          <div className=' flex flex-col gap-[20px]'>
            <div  className=' text-h3 font-extrabold font-nunito text-start  md:text-center'>Terms & Conditions</div>
            <div>Amet justo donec enim diam vulputate ut. Sagittis eu volutpat odio facilisis. Ut venenatis tellus in metus vulputate. Nunc congue nisi vitae suscipit. Tempus urna et pharetra pharetra massa massa ultricies mi quis. Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla.</div>
          </div>
        </div>

        <div className=' w-full  2xl:w-[1400px] m-auto px-[15px] 2xl:p-0  '>
          <OurBenefits />
        </div>
       
    </div>
  )
})


export default ShippingInfoPage