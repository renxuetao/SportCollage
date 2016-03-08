/**
	*Base JavaScript
	*http://www.bgbk.org
*/
( function( $, args ){

	//判断移动端
	function is_mobile(){
		return $( '#mobile-header' ).css( 'display' ) == 'block';
	}

	//快捷键提交评论
	$( document ).keypress( function( e ){
		var btn = $( '#respond #submit' );
		if( e.ctrlKey && e.which == 13 || e.which == 10 ){ 
			btn.click();
			document.body.focus();
			return;
		}
		if( e.shiftKey && e.which == 13 || e.which == 10 ) btn.click();
	} );

	//评论表情框
	$( document ).on( 'click', '#commentform .comment-form-smiley .button', function( e ){
		e.stopPropagation();
		$( this ).next( '.smiley-box' ).html( args.insert_smiley ).slideToggle();
	} );
	$( document ).on( 'click', function(){
		$( '#commentform .comment-form-smiley .smiley-box' ).slideUp();
	} );
	$( document ).on( 'click', '#commentform .comment-form-smiley .smiley-box', function(){
		if( !is_mobile() ) e.stopPropagation();
	} )

	//评论框插入表情
	$( document ).on( 'click', '#commentform .comment-form-smiley .smiley-box > a', function(){
		var textarea = document.getElementById( 'comment' ),
			content = ' ' + $( this ).data( 'smiley' ) + ' ';
		if( !textarea || textarea.type != 'textarea' ) return;
		if( document.selection ){
			textarea.focus();
			var sel = document.selection.createRange();
			sel.text = content;
			textarea.focus();
		}else if( textarea.selectionStart || textarea.selectionStart == '0' ){
			var selectionEnd = textarea.selectionEnd;
			textarea.value = textarea.value.substring( 0, textarea.selectionStart ) + content + textarea.value.substring( selectionEnd, textarea.value.length );
			selectionEnd += content.length;
			textarea.focus();
			textarea.selectionStart = selectionEnd;
			textarea.selectionEnd = selectionEnd;
		} else {
			textarea.value += content;
			textarea.focus();
		}
	} );

	//AJAX 提交评论
	$( document ).on( 'submit', '#commentform', function(){
		if( !args.ajax_comment ) return true;
		var form                    = $( this ),
			respond                 = $( '#respond' ),
			respond_parent          = respond.parent(),
			respond_parent_tag_name = respond_parent.get( 0 ).tagName,
			comment_parent_element  = null,
			submit                  = form.find( '#submit' ),
			submit_text             = submit.val(),
			submit_count_wait       = 15,
			comments_number         = form.parents( '#comments' ).find( '.comments-number' );
		function submit_count(){
			if( submit_count_wait > 0 ){
				submit.val( submit_count_wait );
				--submit_count_wait;
				setTimeout( submit_count, 1000 );
				return;
			}
			submit.attr( 'disabled', false );
			submit.val( submit_text ).fadeTo( 'slow', 1 );
		}
		submit.attr( 'disabled', true );
		submit.val( args.comment_loading ).fadeTo( 'slow', 0.5 );
		$.ajax( {
			url: args.admin_ajax,
			data: form.serialize() + '&action=submit_comment',
			type: form.attr( 'method' ),
			error: function( request ){
				submit.val( request.responseText );
				setTimeout( function(){
					submit.attr( 'disabled', false );
					submit.val( submit_text ).fadeTo( 'slow', 1 ).fadeTo( 'slow', 1 );
				}, 3000 );
			},
			success: function( data ){
				form.find( '#comment' ).val( '' );
				if( comments_number.length ){
					var number = parseInt( comments_number.text() );
					comments_number.text( number + 1 );
				}
				if( respond_parent_tag_name == 'DIV' ) comment_parent_element = respond_parent.children( '.comments-list' );
				else{
					if( !respond_parent.children( 'ul.children' ).length ) respond.before( '<ul class="children"></ul>' );
					comment_parent_element = respond_parent.children( 'ul.children' );
				}
				comment_parent_element.append( data );
				var comment_element = comment_parent_element.children( 'li:last' );
				comment_element.hide();
				comment_element.fadeIn( 4000 );
				$( 'body' ).animate( { scrollTop: comment_element.offset().top }, 900 );
				submit_count();
			}
		} );
		return false;
	} );

	//AJAX 加载页面
	( function(){

		if( !args.ajax_load_page || !history.pushState ) return;
		var start_push      = true,
			ajax_obj        = null,
			menu            = null,
			load_posts_list = false;

		//AJAX 加载链接
		$( document ).on( 'click', 'a:not([data-no-ajax], .comment-reply-link, #cancel-comment-reply-link)', function(){
			var url    = $( this ).attr( 'href' ),
				site_url = args.site_url,
				target = $( this ).attr( 'target' );
			if(//排除一下内容不做异步操作
				( target && target != '_self' ) ||
				this.pathname.indexOf( '/wp-admin' ) !== -1 ||
				this.pathname.indexOf( '/api/user/login' ) !== -1 ||
				this.pathname.indexOf( '/api/user/regist' ) !== -1 ||
				this.pathname.indexOf( '/api/user/forget' ) !== -1 ||
				this.pathname.indexOf( '/' ) !== -1 ||
				this.pathname.indexOf( '/feed' ) !== -1 ||
				this.search.indexOf( '?feed=' ) !== -1 ||
				this.search.indexOf( '&feed=' ) !== -1 ||
				this.pathname.indexOf( '.js' ) !== -1 ||
				this.pathname.indexOf( '.css' ) !== -1 ||
				this.pathname.indexOf( '.bmp' ) !== -1 ||
				this.pathname.indexOf( '.pcx' ) !== -1 ||
				this.pathname.indexOf( '.png' ) !== -1 ||
				this.pathname.indexOf( '.jpg' ) !== -1 ||
				this.pathname.indexOf( '.gif' ) !== -1 ||
				this.pathname.indexOf( '.tiff' ) !== -1 ||
				this.pathname.indexOf( '.zip' ) !== -1 ||
				this.pathname.indexOf( '.rar' ) !== -1 ||
				this.pathname.indexOf( '.psd' ) !== -1 ||
				this.hostname != document.domain
			) return true;
			ajax_load_page( url );
			return false;
		} );

		//AJAX 刷新
		$( document ).on( 'click', '#header .control > li.refresh > a', function(){
			ajax_load_page( location.href );
			return false;
		} );

		//AJAX 搜索
		$( document ).on( 'submit', '.search-form', function(){
			var action    = $( this ).attr( 'action' ),
				a_element = document.createElement( 'a' );
			a_element.href = action;
			ajax_load_page( action + ( a_element.search ? '&' : '?' ) + $( this ).serialize() );
			return false;
		} );

		//修改菜单高亮
		$( document ).on( 'click', '.menu li a', function(){
			menu = $( this );
		} );

		//修改移动菜单高亮
		$( document ).on( 'click', '#mobile-menu li a', function(){
			set_mobile_menu_current( $( this ).parent( 'li' ).data( 'name' ) );
		} );

		//AJAX 加载页面
		function ajax_load_page( url ){
			if( ajax_obj ) ajax_obj.abort();
			ajax_obj = $.ajax( {
				url: url,
				type: 'GET',
				data: 'ajax_load=page',
				dataType: 'json',
				beforeSend: function(){
					$( '#container' ).fadeTo( 500, 0.3 );
					$( 'body' ).animate( { scrollTop: 0 }, 120 );
				},
				complete: function(){
					ajax_obj = null;
				},
				error: function( request ){
					if( request.statusText == 'abort' ) return;
					alert( request.statusText );
					$( '#container' ).fadeTo( 500, 1 );
				},
				success: function( data ){
					if( start_push ){
						history.pushState( get_state(), document.title, location.href );
						start_push = false;
					}
					$( '.menu li.menu-item' ).removeClass( 'current-menu-item current-menu-parent current_page_item current-post-ancestor' );
					if( menu ){
						menu.parent( 'li.menu-item' ).addClass( 'current-menu-item' ).parents( 'li.menu-item' ).addClass( 'current-menu-parent' );
						menu = null;
					}
					document.title = data.title;
					$( '#container' ).replaceWith( data.code );
					$( '#container' ).fadeTo( 0, 0.3 ).fadeTo( 500, 1 );
					$( 'body' ).attr( 'class', data.body_class );
					if( data.refresh_sidebar ) $( '#sidebar' ).replaceWith( data.sidebar_code );
					if( data.mobile_menu_current ) set_mobile_menu_current( data.mobile_menu_current );
					$( '#mobile-header .mobile-title' ).text( data.mobile_title );
					data.mobile_return_show ? $( '#mobile-header .mobile-return' ).addClass( 'show' ) : $( '#mobile-header .mobile-return' ).removeClass( 'show' );
					history.pushState( get_state(), data.title, url );
					goto_hash_element();
				}
			} );
		}

		//浏览器前进后退
		window.addEventListener( 'popstate', function( e ){
			if( !e.state ) return;
			document.title = e.state.title;
			$( '#container' ).replaceWith( e.state.code );
			$( '#sidebar' ).replaceWith( e.state.sidebar_code );
			$( 'body' ).attr( 'class', e.state.body_class );
			set_mobile_menu_current( e.state.mobile_menu_current );
			$( '#mobile-header .mobile-title' ).text( e.state.mobile_title );
			e.state.mobile_return_show ? $( '#mobile-header .mobile-return' ).addClass( 'show' ) : $( '#mobile-header .mobile-return' ).removeClass( 'show' );
			$( 'body' ).animate( { scrollTop: 0 }, 120 );
			goto_hash_element();
		});

		//获取网页内容
		function get_state(){
			return {
				title:               document.title,
				code:                $( '#container' ).clone().fadeTo( 0, 1 ).prop( 'outerHTML' ),
				body_class:          $( 'body' ).attr( 'class' ),
				sidebar_code:        $( '#sidebar' ).prop( 'outerHTML' ),
				mobile_menu_current: $( '#mobile-menu li.current' ).data( 'name' ),
				mobile_title:        $( '#mobile-header .mobile-title' ).text(),
				mobile_return_show:  $( '#mobile-header .mobile-return' ).hasClass( 'show' )
			};
		}

		//锚点跳转
		function goto_hash_element(){
			var hash_element = $( location.hash );
			if( hash_element.length ) $( 'body' ).animate( { scrollTop: hash_element.offset().top }, 120 );
		}

		//设置移动菜单高亮
		function set_mobile_menu_current( current ){
			$( '#mobile-menu li' ).removeClass( 'current' ).filter( '.' + current ).addClass( 'current' );
		}

		//下拉加载文章
		$( window ).scroll( function(){
			if( $( this ).scrollTop() < $( document ).height() - $( this ).height() - 10 || !is_mobile() || ajax_obj ) return;
			var page_navi = $( '.posts-list-mobile-page-navi' ),
				next_link  = page_navi.data( 'next-link' );
			if( !next_link ) return;
			ajax_obj = $.ajax( {
				url: next_link,
				type: 'GET',
				data: 'ajax_load=page',
				dataType: 'json',
				beforeSend: function(){
					$( '.posts-list-mobile-page-navi' ).addClass( 'loading' );
				},
				complete: function(){
					ajax_obj = null;
					load_posts_list = false;
					$( '.posts-list-mobile-page-navi' ).removeClass( 'loading' );
				},
				error: function( request ){
					if( request.statusText != 'abort' ) alert( request.statusText );
				},
				success: function( data ){
					document.title = data.title;
					var element = $( data.code );
					$( 'body' ).attr( 'class', data.body_class );
					element.find( '.posts-list > li' ).appendTo( '.posts-list' );
					element.find( '.posts-list-mobile-page-navi' ).replaceAll( '.posts-list-mobile-page-navi' );
					$( '.posts-list-page-navi' ).remove();
				}
			} );
		} );

	} )();

} )( jQuery, Base_args );