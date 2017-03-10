var gapTop = 16;

function masorny_init(selector, column_count){

    $column = $(selector).find('.column');
    $len = $column.length;

    for($i=0;$i<$len;$i++){
        $img = $($column[$i]).find('img');
        // $height = $img.height;
        $height = $($column[$i]).height();
        $left = getLeft($i, column_count);
        $($column[$i]).css('left', $left);
        //top set
        if($i<column_count){
            $($column[$i]).css('top', '0px');
        }
        if($i>column_count-2){
            $loop=true;
            $top=0;
            $find_idx = $i;
            while($loop){
                $find_idx = $find_idx-column_count;
                $img = $($column[$find_idx]).find('img');
                if($img.length > 0){
                    // $height = $img[0].height;
                    $height = $($column[$find_idx]).height();
                    $top += $height;
                    $top += gapTop;
                }
                else{
                    $loop = false;
                }
            }
            $($column[$i]).css('top', $top+'px');
        }
    }//end for

    //get height
    var heights = [];
    for($j=0;$j<column_count;$j++){
        // heights[$j] = $($column[$j]).height();
        heights[$j] = 0;
        // console.log(heights[$j]);
        for($jj=0;$jj<$len/column_count;$jj++){
            // console.log($($column[$j*$jj+column_count]).height());
            // var idx = $j*$jj+(column_count*$jj);
            var idx = $j+(column_count*$jj);
            heights[$j] +=  $($column[idx]).height();
            heights[$j] += gapTop;
        }
    }
    var maxHeight = getMaxOfArray(heights);
    $(selector).css('height', maxHeight);

}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

// console.log($column[0]);



function getLeft(idx, column_count) {
    var left = "0%";
    if(column_count == 4){
        switch($i%column_count){
            case 0 : left =  '0%';break;
            case 1 : left = '25%';break;
            case 2 : left = '50%';break;
            case 3 : left = '75%';break;
        }
    }
    else if(column_count == 2){
        switch($i%column_count){
            case 0 : left =  '0%';break;
            case 1 : left = '50%';break;
        }
    }
    return left;
}

var MANSORNY = {
    load : function(selector){
        // window load event
        window.addEventListener('load', function(){
            var innerWidth = $(window).width();
            if(innerWidth < 445){
                masorny_init(selector, 1);
            }
            else if(innerWidth < 800){
                masorny_init(selector, 2);
            }
            else if(innerWidth > 800){
                masorny_init(selector, 4);
            }
        });

        // window resize event
        window.addEventListener('resize', function(evt){
            var innerWidth = evt.target.innerWidth;
            if(innerWidth < 445){
                masorny_init(selector, 1);
            }
            else if(innerWidth < 800){
                // masorny_resize();
                masorny_init(selector, 2);
            }
            else if(innerWidth > 800){
                masorny_init(selector, 4);
            }
        });
    }
};
