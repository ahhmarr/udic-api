var plan=require('flightplan');
plan.target('production',[
	{
		host : '139.59.6.168',
		username : 'deploy',
		agent : process.env.SSH_AUTH_SOCK
	}
]);
var tmpDir='ahmar-com'+new Date().getTime();

plan.local(function(local)
{
	local.log('started planning');
	var fileToCopy=local.exec('git ls-files');
	local.transfer(fileToCopy,'/tmp/'+tmpDir);
	local.log('filed copied to /tmp/'+tmpDir);
	
});

plan.remote(function(remote)
{
	remote.log('Moving folder to webroot');
	remote.sudo('cp -R /tmp/'+tmpDir+' ~',{user:'deploy'});
	remote.sudo('rm -rf /tmp/'+tmpDir);

	remote.log('installing dependencies');
	remote.sudo('npm --production --prefix ~/'+tmpDir
				+' install ~/'+tmpDir,{user:'deploy'});

	remote.log('reloading application');
	remote.sudo('ln -snf ~/'+tmpDir+' ~/urbandict_api',{user:'deploy'});
	remote.sudo('pm2 reload urbandict_api',{user:'deploy'});
});