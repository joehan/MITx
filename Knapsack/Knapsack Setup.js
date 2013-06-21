var weightLimit= 200;
//Constraint on the weight. Change this to change how much the bag can hold

var valueList = [{'price':110, 'weight':100}, {'price':35, 'weight':25}, {'price':200, 'weight':200} ,{'price':5, 'weight':5}, {'price':130, 'weight':105}, {'price':100, 'weight':70}]

//Holds the price and weight of each object. The first set of brackets corresponds to the top left, the seocnd to the top middle, the third to the top right, the fourth to the bottom left, the fifth to the bottom middle, and the sixth to the bottom right. 

var winningPrice= 265;
//Put the final price at the problem's completed state here. When the user reaches this value, if they haven't broken the weight limit, they win.

var instructionsText = 'Instructions: Get as much value into your bag as possible. Click on items to move them between the house and your bag. Be careful, though; your bag can only hold 200 lbs before you would throw your back out trying to carry it!'
//Holds the instructions. This will appear underneath the house box

var imgList= [ 'img', 'img', 'img', 'img','img', 'img']
//Holds custom images, if you want. Not working ATM, but if you put the image url in quotes where the imgs appear, your picture will be used. The list is in the same order as value list: left to right top row, the left to right bottom row.
