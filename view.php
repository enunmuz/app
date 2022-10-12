<?php 
// Include the database configuration file  
require_once 'db_connection.php'; 
 
// Get image data from database 
$result = $db->query("SELECT slider_image_urls FROM menu_builder_data ORDER BY id DESC"); 
?>

<?php if($result->num_rows > 0){ ?> 
    <div class="gallery"> 
        <?php while($row = $result->fetch_assoc()){ ?> 
            <img style="width:33%;" src="<?php echo $row['slider_image_urls']; ?>" /> 
        <?php } ?> 
    </div> 
<?php }else{ ?> 
    <p class="status error">Image(s) not found...</p> 
<?php } ?>