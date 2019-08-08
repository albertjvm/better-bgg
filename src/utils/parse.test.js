import { parse } from './parse';

test('parses string child', () => {
  expect(
    parse(`
      <name>Joe</name>
    `)
  ).toEqual(
    {
      name: 'Joe'
    }
  );
});

test('parses attributes', () => {
  expect(
    parse(`
      <firstname value="Joe" />
    `)
  ).toEqual(
    {
      firstname: {
        value: 'Joe'
      }
    }
  );
});

test('parses a list of simple children', () => {
  expect(
    parse(`
      <user>
        <firstname value="Joe" />
        <lastname value="Smith" />
      </user>
    `)
  ).toEqual(
    {
      user: {
        firstname: { value: 'Joe' },
        lastname: { value: 'Smith' },
      },
    }
  );
});

test('parses a list of similar children', () => {
  expect(
    parse(`
      <item>
        <name type="primary" value="James" />
        <name type="alternate" value="Jim" />
      </item>
    `)
  ).toEqual(
    {
      item: {
        names: [
          { value: 'James', type: 'primary' },
          { value: 'Jim', type: 'alternate' },
        ],
      },
    }
  );
});

// test('complex test', () => {
//   expect(
//     parse(`
//       <items>
//         <item type="boardgameexpansion" id="92539">
//           <image>pic1046319.jpg</image>
//   				<name type="primary" sortindex="1" value="7 Wonders: Leaders" />
//   				<name type="alternate" sortindex="1" value="7 Csoda:Vezetők" />
//           <description>7 Wonders: Leaders adds 42 new cards to the base game of 7 Wonders, comprising four new guilds, one new wonder card, and 36 (+1 blank) white &amp;quot;Leader&amp;quot; cards. At the start of the game, each player takes a hand of four leaders and may play one at the start of each of the three Ages. Unlike the standard cards, leaders cost money (not resources). The expansion comes with a new Wonder&amp;mdash;the ancient city of Rome&amp;mdash;and contains 6-gold tokens made of cardboard for more efficient money-management.&amp;#10;&amp;#10;</description>
//           <yearpublished value="2011" />
//           <minplayers value="2" />
//           <maxplayers value="7" />
//           <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="87">
//         		<results numplayers="1">		
//               <result value="Best" numvotes="0" />
//               <result value="Recommended" numvotes="0" />
//               <result value="Not Recommended" numvotes="62" />
// 				    </results>						
// 		        <results numplayers="2">		
//               <result value="Best" numvotes="8" />
//               <result value="Recommended" numvotes="18" />
//               <result value="Not Recommended" numvotes="45" />
// 				    </results>					
//         		<results numplayers="3">		
//               <result value="Best" numvotes="20" />
//               <result value="Recommended" numvotes="46" />
//               <result value="Not Recommended" numvotes="8" />
// 		    		</results>					
//         		<results numplayers="4">		
//               <result value="Best" numvotes="48" />
//               <result value="Recommended" numvotes="29" />
//               <result value="Not Recommended" numvotes="2" />
// 		    		</results>					
//         		<results numplayers="5">		
//               <result value="Best" numvotes="36" />
//               <result value="Recommended" numvotes="37" />
//               <result value="Not Recommended" numvotes="1" />
// 		    		</results>					
//         		<results numplayers="6">		
//               <result value="Best" numvotes="17" />
//               <result value="Recommended" numvotes="46" />
//               <result value="Not Recommended" numvotes="8" />
// 		    		</results>					
//         		<results numplayers="7">		
//               <result value="Best" numvotes="22" />
//               <result value="Recommended" numvotes="38" />
//               <result value="Not Recommended" numvotes="12" />
// 		    		</results>					
//         		<results numplayers="7+">		
//               <result value="Best" numvotes="2" />
//               <result value="Recommended" numvotes="5" />
//               <result value="Not Recommended" numvotes="48" />
// 		    		</results>					
// 	        </poll>
//           <playingtime value="40" />
//           <minplaytime value="40" />
//           <maxplaytime value="40" />
//           <minage value="13" />
// 					<link type="boardgamecategory" id="1050" value="Ancient" />
// 					<link type="boardgamecategory" id="1002" value="Card Game" />
// 					<link type="boardgamecategory" id="1029" value="City Building" />
// 					<link type="boardgamecategory" id="1015" value="Civilization" />
// 					<link type="boardgamecategory" id="1042" value="Expansion for Base-game" />
// 					<link type="boardgamemechanic" id="2041" value="Card Drafting" />
// 					<link type="boardgamemechanic" id="2040" value="Hand Management" />
// 					<link type="boardgamemechanic" id="2004" value="Set Collection" />
// 					<link type="boardgamemechanic" id="2020" value="Simultaneous Action Selection" />
// 					<link type="boardgamemechanic" id="2015" value="Variable Player Powers" />
// 					<link type="boardgamefamily" id="17552" value="7 Wonders" />
//         </item>
//       </items>
//     `)
//   ).toEqual(
//     {}
//   );
// });